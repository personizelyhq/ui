<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ type: resolveToastType(props) }), props.class)"
    @update:open="onOpenChange"
    @escape-key-down="blockDismiss"
    @swipe-start="blockDismiss"
    @swipe-move="blockDismiss"
    @swipe-end="blockDismiss"
  >
    <slot />
  </ToastRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'reka-ui'
import { type ToastProps, resolveToastType, toastVariants } from '.'
import { cn } from '@/utils/tailwind'

const props = withDefaults(defineProps<ToastProps>(), {
  dismissible: true
})

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, type: _type, variant: _variant, removeIcon: _removeIcon, dismissible: _dismissible, politeness, ...delegated } = props

  return { ...delegated, type: politeness }
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// reka closes the toast on swipe and on Escape unless the event is prevented.
const blockDismiss = (event: Event) => {
  if (!props.dismissible)
    event.preventDefault()
}
</script>
