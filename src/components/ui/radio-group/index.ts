import { cva } from 'class-variance-authority'

export { default as RadioGroup } from './RadioGroup.vue'

export const radioGroupVariants = cva('flex ', {
  variants: {
    orientation: {
      vertical: 'flex-col gap-2',
      horizontal: 'gap-4 flex-wrap'
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
})
