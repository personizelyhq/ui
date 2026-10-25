<template>
  <PaginationFirst
    data-slot="pagination-first"
    :class="cn(buttonVariants({ variant: 'ghost', size, icon: true }), props.class)"
    v-bind="forwarded"
  >
    <slot>
      <ChevronsLeftIcon />
      <span class="sr-only">First</span>
    </slot>
  </PaginationFirst>
</template>

<script setup lang="ts">
import type { PaginationFirstProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronsLeftIcon } from '@lucide/vue'
import { PaginationFirst, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationFirstProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'md'
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>
