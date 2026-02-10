<template>
  <DropdownMenuRoot v-bind="forwarded">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuContent
      :class="props.class"
      :side-offset="4"
      :align="align"
      :side="side"
    >
      <template v-if="label || $slots.label">
        <DropdownMenuLabel>
          <slot name="label">
            {{ label }}
          </slot>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </template>

      <template v-for="(item, index) in items" :key="index">
        <DropdownMenuPart :item="item" @select="$emit('select', $event)">
          <template v-if="$slots['group-action']" #group-action="{ item }">
            <slot name="group-action" v-bind="{ item }" />
          </template>
          <template v-if="$slots['item-icon']" #item-icon="{ item }">
            <slot name="item-icon" v-bind="{ item }" />
          </template>
          <template v-if="$slots['item-label']" #item-label="{ item }">
            <slot name="item-label" v-bind="{ item }" />
          </template>
          <template v-if="$slots['item-help']" #item-help="{ item }">
            <slot name="item-help" v-bind="{ item }" />
          </template>
        </DropdownMenuPart>
        <DropdownMenuSeparator v-if="index !== items.length - 1 && ('items' in item || 'items' in items[index + 1])" />
      </template>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, provide } from 'vue'
import {
  DropdownMenuRoot,
  type DropdownMenuRootEmits,
  type DropdownMenuRootProps,
  type DropdownMenuContentProps
} from 'reka-ui'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuPart from './DropdownMenuPart.vue'
import type { MenuItem, MenuItemWithChildren, MenuGroupItem } from './'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'

const props = defineProps<DropdownMenuRootProps & Pick<DropdownMenuContentProps, 'side' | 'align'> & {
  items: (MenuItem | MenuItemWithChildren | MenuGroupItem)[]
  label?: string,
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<DropdownMenuRootEmits & {
  select: [item: MenuItem]
}>()

provide('hasDropdown', true)

const delegatedProps = useDelegatedProps(props, ['align', 'side', 'label', 'items', 'class'])
const delegatedEmits = useEmitAsProps(emits, ['select'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)
</script>
