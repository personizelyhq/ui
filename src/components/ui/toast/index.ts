import type { ToastRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Toaster } from './Toaster.vue'
export { default as Toast } from './Toast.vue'
export { default as ToastViewport } from './ToastViewport.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastIcon } from './ToastIcon.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as ToastProvider } from './ToastProvider.vue'
export { toast, useToast } from './useToast'

import { type VariantProps, cva } from 'class-variance-authority'

// A toast floats above unknown page content, so the surface itself has to stay opaque:
// `bg-background` carries it and the accent tint is painted by an isolated `::before`
// layer on top of it (a translucent `bg-*/6` on the root would let the page show through).
export const toastVariants = cva('group pointer-events-auto isolate relative flex w-full items-start gap-3 overflow-hidden rounded-lg border bg-background p-3 pr-10 shadow-lg transition-all before:absolute before:inset-0 before:-z-10 before:pointer-events-none data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full', {
  variants: {
    type: {
      info: '',
      error: 'border-error/50 before:bg-error/6',
      warning: 'border-warning/50 before:bg-warning/6',
      success: 'border-success/50 before:bg-success/6'
    }
  },
  defaultVariants: {
    type: 'info'
  }
})

export const iconVariants = cva('w-4 h-4 mt-0.5 shrink-0', {
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

export type ToastVariants = VariantProps<typeof toastVariants>
export type ToastIconVariants = VariantProps<typeof iconVariants>

/** @deprecated use `type` instead */
export type ToastLegacyVariant = 'default' | 'destructive'

// `type` is taken over for the visual type (to match `Alert`), so reka's own
// `type` — how screen readers announce the toast — is exposed as `politeness`.
export interface ToastProps extends Omit<ToastRootProps, 'type'> {
  class?: HTMLAttributes['class']
  type?: ToastVariants['type']
  politeness?: ToastRootProps['type']
  removeIcon?: boolean
  /** Hides the close button and blocks swipe/Escape. The toast then has to be resolved by its action (or by `duration`). */
  dismissible?: boolean
  /** @deprecated use `type` instead — `destructive` maps to `error` */
  variant?: ToastLegacyVariant
  onOpenChange?: ((value: boolean) => void) | undefined
}

export const resolveToastType = (props: Pick<ToastProps, 'type' | 'variant'>): NonNullable<ToastVariants['type']> => {
  if (props.type) return props.type

  return props.variant === 'destructive' ? 'error' : 'info'
}
