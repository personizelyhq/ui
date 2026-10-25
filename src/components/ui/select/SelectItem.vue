<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 aria-selected:font-medium',
        props.class,
      )
    "
  >
    <SelectItemText>
      <slot />
    </SelectItemText>
    <SelectItemIndicator as-child>
      <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <Check class="h-4 w-4" />
      </span>
    </SelectItemIndicator>
  </SelectItem>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
  type SelectItemProps
} from 'reka-ui'
import { Check } from '@lucide/vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
