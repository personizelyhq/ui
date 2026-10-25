<template>
  <PaginationNext
    data-slot="pagination-next"
    :class="cn(buttonVariants({ variant: 'ghost', size, icon: true }), props.class)"
    v-bind="forwarded"
  >
    <slot>
      <span class="sr-only">Next</span>
      <ChevronRightIcon />
    </slot>
  </PaginationNext>
</template>

<script setup lang="ts">
import type { PaginationNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronRightIcon } from '@lucide/vue'
import { PaginationNext, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationNextProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'md'
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>
