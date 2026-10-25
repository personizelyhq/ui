<template>
  <PaginationLast
    data-slot="pagination-last"
    :class="cn(buttonVariants({ variant: 'ghost', size, icon: true }), props.class)"
    v-bind="forwarded"
  >
    <slot>
      <span class="sr-only">Last</span>
      <ChevronsRightIcon />
    </slot>
  </PaginationLast>
</template>

<script setup lang="ts">
import type { PaginationLastProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronsRightIcon } from '@lucide/vue'
import { PaginationLast, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationLastProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'sm'
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>
