<template>
  <ToastClose v-bind="delegatedProps" as-child>
    <Button
      size="xs"
      icon="x"
      :variant="variant"
      :class="cn('absolute right-2 top-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100', props.class)"
    />
  </ToastClose>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastClose, type ToastCloseProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import { Button, type ButtonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class'],
  variant?: ButtonVariants['variant']
}>(), {
  variant: 'ghost'
})

const delegatedProps = computed(() => {
  const { class: _class, variant: _variant, ...delegated } = props

  return delegated
})
</script>
