<template>
  <ToastAction v-bind="delegatedProps" as-child>
    <Button size="sm" :variant="variant" :class="props.class">
      <slot />
    </Button>
  </ToastAction>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastAction, type ToastActionProps } from 'reka-ui'
import { Button, type ButtonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<ToastActionProps & {
  class?: HTMLAttributes['class'],
  variant?: ButtonVariants['variant']
}>(), {
  variant: 'outline'
})

const delegatedProps = computed(() => {
  const { class: _class, variant: _variant, ...delegated } = props

  return delegated
})
</script>
