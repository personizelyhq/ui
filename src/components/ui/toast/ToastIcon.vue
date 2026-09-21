<template>
  <component :is="icon" :class="cn(iconVariants({ type }), props.class)" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Info, TriangleAlert, CircleCheck, CircleAlert } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'
import { type ToastVariants, iconVariants } from '.'
import { cn } from '@/utils/tailwind'

const props = withDefaults(defineProps<{
  type?: ToastVariants['type'],
  class?: HTMLAttributes['class']
}>(), {
  type: 'info'
})

const icon = computed(() => {
  return {
    info: Info,
    warning: TriangleAlert,
    success: CircleCheck,
    error: CircleAlert
  }[props.type!]
})
</script>
