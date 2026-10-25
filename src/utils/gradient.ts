import chroma from 'chroma-js'

type InterpolationMode = chroma.InterpolationMode


export type Point = { left: number, color: string }
type Gradient = {
  points: Point[],
  angle: number,
  type: string,
  precision?: number,
  interpolation?: InterpolationMode
  xAxis?: string
  yAxis?: string
  shape?: string
}

const extractType = (definition: string) => {
  const match = /(linear|radial|conic)/gm.exec(definition)
  return (match && match[0]) || 'linear'
}

const extractAngle = (definition: string) => {
  const match = /((?<angle>\d+)deg)/gis.exec(definition)

  return (match && Number(match.groups!.angle)) || 0
}

const extractShape = (definition: string, type: string) => {
  if (type !== 'radial') return 'circle'

  const shape = /(ellipse|circle)/gm.exec(definition)
  return (shape && shape[0]) || 'circle'
}

const extractAxis = (definition: string, type: string) => {
  if (type === 'linear') return { xAxis: '50%', yAxis: '50%' }

  const match = /at\s(\d+%)\s(\d+%),/gis.exec(definition)
  return match
    ? { xAxis: match[1], yAxis: match[2] }
    : { xAxis: '50%', yAxis: '50%' }
}

const extractColors = (gradient: string) => {
  const rgba = gradient.match(/(rgba?\(\s?\d+,\s+?\d+,\s+?\d+(,\s+?\d+\.?\d*)?\)\s\d+%)/gm)
  const hsla = gradient.match(/(hsla?\(\s?\d+,\s+?\d+%,\s+?\d+%(,\s+?\d+\.?\d*)?\)\s\d+%)/gm)
  const hex = gradient.match(/(#[a-fA-F\d+]{3,6}\s\d+%|#([A-Fa-f0-9]{4}){1,2}\s\d+%)/gm)

  if (!rgba && !hex && !hsla) {
    console.error('Extract error ', gradient, 'colors [', rgba, '], hex [', hex, '], hsla [', hsla, ']')
    return []
  }

  return [...rgba || [], ...hex || [], ...hsla || []]
    .reduce((buffer: Array<{ left: number, color: string }>, entry) => {
      const regexp = entry.startsWith('#')
        ? /(?<color>#[a-fA-F\d+]{3,6}|#([A-Fa-f0-9]{4}){1,2})\s(?<left>\d+)%/i
        : /(?<color>rgba?\(\s?\d+,\s+?\d+,\s+?\d+(,\s+?\d+\.?\d*)?\)|hsla?\(\s?\d+,\s+?\d+%,\s+?\d+%(,\s+?\d+\.?\d*)?\))\s(?<left>\d+)%/i

      const extracted = regexp.exec(entry)
      if (extracted) {
        const { color, left } = extracted.groups as { color: string, left: string }
        if (color && left) {
          buffer.push({
            left: Number(left),
            color
          })
        }
      }
      return buffer
    }, [])
}

const sortPoints = (points: Point[]) => {
  return [...points].sort((a, b) => a.left - b.left)
}

const spread = (arr: string[], from: number, to: number) => {
  const result = []
  for (let i = 0; i <= arr.length - 1; i++) {
    result.push({
      left: Math.floor(from + ((to - from) / (arr.length - 1) * i)),
      color: arr[i]
    })
  }

  return result
}

export const preparePoints = (points: Point[], interpolation: InterpolationMode, precision: number) => {
  const result = []
  points = sortPoints(points)
  for (let i = 0; i <= points.length - 2; i++) {
    const scale = spread(chroma
      .scale([points[i].color, points[i + 1].color])
      .mode(interpolation)
      .colors(precision + 2), points[i].left, points[i + 1].left)

    if (i !== 0) {
      scale.splice(0, 1)
    }

    result.push(...scale)
  }

  return result
}

const toColor = (point: Point) => {
  return `${point.color} ${point.left}%`
}

const toLinearGradient = (properties: Gradient) => {
  const { angle = 0, points = [], interpolation = 'hsl', precision = 0 } = properties
  return `linear-gradient(${angle}deg, ${preparePoints(points, interpolation, precision).map(point => toColor(point)).join(', ')})`
}

const toRadialGradient = (properties: Gradient) => {
  const { shape = 'circle', xAxis = '50%', yAxis = '50%', points = [], interpolation = 'hsl', precision = 0 } = properties
  return `radial-gradient(${shape} at ${xAxis} ${yAxis}, ${preparePoints(points, interpolation, precision).map(point => toColor(point)).join(', ')})`
}

const toConicGradient = (properties: Gradient) => {
  const { angle = '0deg', xAxis = '50%', yAxis = '50%', points = [], interpolation = 'hsl', precision = 0 } = properties
  return `conic-gradient(from ${angle}deg at ${xAxis} ${yAxis}, ${preparePoints(points, interpolation, precision).map(point => toColor(point)).join(', ')})`
}

export const parseGradient = (gradient: string) => {
  const type = extractType(gradient)
  const axis = extractAxis(gradient, type)

  return {
    ...axis,
    angle: extractAngle(gradient),
    shape: extractShape(gradient, type),
    points: extractColors(gradient),
    type
  }
}

export const parse = (declaration: string) => {
  const url = declaration.match(/url\("?(.*?)"?\)/m)
  const image = url
    ? url[1].trim()
    : null

  const gradient = declaration.replace(/,?(\s+)?url\(.*\)/gm, '')

  return { image, gradient }
}

export const compile = ({ points, interpolation = 'hsl', precision = 0, type = 'linear', angle = 90 }: Gradient) => {
  switch (type) {
    case 'linear': return toLinearGradient({ points, interpolation, precision, type, angle })
    case 'radial': return toRadialGradient({ points, interpolation, precision, type, angle })
    case 'conic': return toConicGradient({ points, interpolation, precision, type, angle })
    default: return ''
  }
}
