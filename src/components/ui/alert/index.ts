import { type VariantProps, cva } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'

export const alertVariants = cva('relative text-foreground w-full rounded-lg border p-3', {
  variants: {
    type: {
      info: 'bg-background',
      error: 'border-error/50 bg-error/6',
      warning: 'border-warning/50 bg-warning/6',
      success: 'border-success/50 bg-success/6'
    }
  },
  defaultVariants: {
    type: 'info'
  }
})

export const iconVariants = cva('w-4 h-4 absolute left-3.5 top-3.5', {
  variants: {
    type: {
      info: 'text-foreground',
      error: 'text-error',
      warning: 'text-warning',
      success: 'text-success'
    }
  },
  defaultVariants: {
    type: 'info'
  }
})

export type AlertVariants = VariantProps<typeof alertVariants>
export type AlertIconVariants = VariantProps<typeof iconVariants>
