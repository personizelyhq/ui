<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex gap-4"
      :class="[
        orientation === 'horizontal' && 'flex-col',
        orientation === 'vertical' && 'flex-row'
      ]"
    >
      <Saturation
        :saturation="s"
        :value="v"
        :hue="hue"
        class="h-40"
        @update:value="setHsv({ v: $event })"
        @update:saturation="setHsv({ s: $event })"
        @update="setHsv($event)"
      />
      <Hue v-model="hue" :orientation="orientation" />
      <Alpha
        v-model="alpha"
        :orientation="orientation"
        :rgb="color.toRgb()"
      />
    </div>
    <div class="flex justify-between gap-1 md:gap-2">
      <Input
        v-if="mode === 'hex'"
        v-model="hex"
        class="w-28 [&>input]:uppercase"
        icon="hash"
        @paste.prevent="onPasteHex"
      />
      <div v-else-if="mode === 'rgba'" class="flex gap-1 md:gap-2">
        <LabelInput v-slot="{ id }" label="R">
          <Input
            :id="id"
            :model-value="Math.round(color.r)"
            class="w-12 *:text-center"
            @update:model-value="setRgb(Number($event) || color.r, 'r')"
          />
        </LabelInput>
        <LabelInput v-slot="{ id }" label="G">
          <Input
            :id="id"
            :model-value="Math.round(color.g)"
            class="w-12 [&>input]:text-center"
            @update:model-value="setRgb(Number($event) || color.g, 'g')"
          />
        </LabelInput>
        <LabelInput v-slot="{ id }" label="B">
          <Input
            :id="id"
            :model-value="Math.round(color.b)"
            class="w-12 [&>input]:text-center"
            @update:model-value="setRgb(Number($event) || color.b, 'b')"
          />
        </LabelInput>
        <LabelInput v-slot="{ id }" label="A">
          <Input
            :id="id"
            v-model.number="alpha"
            class="w-12 [&>input]:text-center"
          />
        </LabelInput>
      </div>
      <div v-else-if="mode === 'hsla'" class="flex gap-1 md:gap-2">
        <LabelInput v-slot="{ id }" label="H">
          <Input
            :id="id"
            :model-value="Math.round(h)"
            class="w-12 *:text-center"
            @update:model-value="setHsl(Number($event) || color.toHsl().h, 'h')"
          />
        </LabelInput>
        <LabelInput v-slot="{ id }" label="S">
          <Input
            :id="id"
            :model-value="Math.round(s * 100)"
            class="w-12 [&>input]:text-center"
            @update:model-value="setHsl(Number($event) || color.toHsl().s / 100, 's')"
          />
        </LabelInput>
        <LabelInput v-slot="{ id }" label="L">
          <Input
            :id="id"
            :model-value="Math.round(color.toHsl().l * 100)"
            class="w-12 [&>input]:text-center"
            @update:model-value="setHsl(Number($event) || color.toHsl().l / 100, 'l')"
          />
        </LabelInput>
        <LabelInput v-slot="{ id }" label="A">
          <Input
            :id="id"
            v-model.number="alpha"
            class="w-12 [&>input]:text-center"
          />
        </LabelInput>
      </div>
      <Button
        variant="ghost"
        @click="toggleMode"
      >
        <template #icon>
          <ChevronsUpDown class="w-4 h-4" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
import { computed, ref, watch } from 'vue'
import Saturation from './Saturation.vue'
import Hue from './Hue.vue'
import Alpha from './Alpha.vue'
import LabelInput from './LabelInput.vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from '@lucide/vue'

const modelValue = defineModel<string>({
  default: 'transparent'
})
withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal'
})

type Mode = 'hex' | 'rgba' | 'hsla'

const mode = ref<Mode>('hex')
const modes: Mode[] = ['hex', 'rgba', 'hsla']

const toggleMode = () => {
  const idx = modes.indexOf(mode.value)
  mode.value = modes[idx + 1 > modes.length - 1 ? 0 : idx + 1]
}

const onPasteHex = (e: ClipboardEvent) => {
  const value = e.clipboardData!.getData('text')
  hex.value = value.startsWith('#') ? value.slice(1) : value
}

const c = new TinyColor(modelValue.value || 'transparent')
const rgb = c.toRgb()

const r = ref(rgb.r)
const g = ref(rgb.g)
const b = ref(rgb.b)

const hsv = c.toHsv()
const h = ref(hsv.h)
const s = ref(hsv.s)
const v = ref(hsv.v)

const a = ref(rgb.a)

const color = computed(() => new TinyColor({ h: h.value, s: s.value, v: v.value, a: 1 }))

const hex = computed({
  get () {
    return color.value.toHex()
  },
  set (value) {
    const c = new TinyColor('#' + value)
    if (c.isValid && value.length === 6) {
      update(c)
    }
  }
})

const alpha = computed({
  get () {
    return a.value
  },
  set (value) {
    a.value = value
    update(new TinyColor(color.value))
  }
})

const hue = computed({
  get () {
    return h.value
  },
  set (value) {
    h.value = value
    const hsl = color.value.toHsl()
    hsl.h = value
    update(new TinyColor(hsl))
  }
})


watch(modelValue, (to) => {
  const c = new TinyColor(to)

  const rgb = c.clone().toRgb()
  r.value = rgb.r
  g.value = rgb.g
  b.value = rgb.b

  const hsv = c.clone().toHsv()
  h.value = hsv.h === 0 ? h.value : hsv.h
  s.value = hsv.s
  v.value = hsv.v

  a.value = rgb.a
})

const setRgb = (value: number, key: 'r' | 'g' | 'b') => {
  const rgb = color.value.toRgb()
  rgb[key] = value
  update(new TinyColor(rgb))
}

const setHsv = (value: { v?: number, s?: number, h?: number }) => {
  const hsv = color.value.toHsv()
  Object.assign(hsv, value)
  update(new TinyColor(hsv))
}

const setHsl = (value: number, key: 'h' | 's' | 'l') => {
  const hsl = color.value.toHsl()
  hsl[key] = value
  update(new TinyColor(hsl))
}

const isSafeHex = (color: TinyColor) => {
  const from = new TinyColor(color.clone().toHexString()).toHsl()
  const to = color.toHsl()
  return to.h === from.h && to.s === from.s && to.l === from.l
}

const isSafeRgba = (color: TinyColor) => {
  const from = new TinyColor(color.clone().toRgbString()).toHsl()
  const to = color.toHsl()
  return to.h === from.h && to.s === from.s && to.l === from.l
}

const update = (value: TinyColor) => {
  value.setAlpha(a.value)

  if (isSafeHex(value) && a.value === 1) {
    modelValue.value = value.toHexString()
  } else if (isSafeRgba(value)) {
    modelValue.value = value.toRgbString()
  } else {
    modelValue.value = value.toHslString()
  }
}
</script>
