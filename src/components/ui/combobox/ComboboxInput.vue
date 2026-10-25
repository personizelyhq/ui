<template>
  <div class="flex items-center relative">
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2 pointer-events-none">
      <Search class="size-4 text-muted-foreground" />
    </span>
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      role="searchbox"
      :aria-expanded="null"
      size="10"
      :class="cn(
        'flex h-8 w-full ps-8 bg-transparent py-1 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
        loading ? 'pe-8' : 'pe-2'
      )"
    />
    <span v-if="loading" class="absolute end-0 inset-y-0 flex items-center justify-center px-2 pointer-events-none">
      <ProgressCircular class="size-4 text-muted-foreground" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Search } from '@lucide/vue'
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import { ProgressCircular } from '@/components/ui/progress-circular'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'],
  loading: boolean
}>(), {
  loading: false
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>



