<template>
  <div :class="cn('static md:absolute md:right-0 md:top-0', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
