<template>
  <textarea v-model="modelValue" v-autofocus="autofocus" :class="cn('flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'
import vAutofocus from '@/directives/autofocus'

const modelValue = defineModel<string | undefined | null>()
const props = withDefaults(defineProps<{
  autofocus?: boolean
  class?: HTMLAttributes['class']
}>(), {
  autofocus: false
})
</script>
