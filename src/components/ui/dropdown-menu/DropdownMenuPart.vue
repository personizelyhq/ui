<template>
  <template v-if="'items' in item">
    <template v-if="item.label">
      <div class="flex items-center justify-between">
        <DropdownMenuLabel>
          <slot name="label" v-bind="{ item }">
            {{ item.label }}
          </slot>
        </DropdownMenuLabel>
        <slot name="group-action" v-bind="{ item }" />
      </div>
      <DropdownMenuSeparator />
    </template>
    <DropdownMenuGroup>
      <DropdownMenuPartItem
        v-for="(groupItem, index) in item.items"
        :key="index"
        :item="groupItem"
        @select="$emit('select', $event)"
      >
        <template v-if="$slots['item-icon']" #icon="{ item }">
          <slot name="item-icon" v-bind="{ item }" />
        </template>
        <template v-if="$slots['item-label']" #label="{ item }">
          <slot name="item-label" v-bind="{ item }" />
        </template>
        <template v-if="$slots['item-help']" #help="{ item }">
          <slot name="item-help" v-bind="{ item }" />
        </template>
      </DropdownMenuPartItem>
    </DropdownMenuGroup>
  </template>
  <DropdownMenuPartItem v-else :item="item" @select="$emit('select', $event)">
    <template v-if="$slots['item-icon']" #icon="{ item }">
      <slot name="item-icon" v-bind="{ item }" />
    </template>
    <template v-if="$slots['item-label']" #label="{ item }">
      <slot name="item-label" v-bind="{ item }" />
    </template>
    <template v-if="$slots['item-help']" #help="{ item }">
      <slot name="item-help" v-bind="{ item }" />
    </template>
  </DropdownMenuPartItem>
</template>

<script setup lang="ts">
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuGroup from './DropdownMenuGroup.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuPartItem from './DropdownMenuPartItem.vue'
import type { MenuItem, MenuItemWithChildren, MenuGroupItem } from './'

defineProps<{
  item: MenuItem | MenuItemWithChildren | MenuGroupItem
}>()

defineEmits<{
  select: [item: MenuItem]
}>()

defineSlots<{
  'label'(props: { item: MenuGroupItem }): any
  'group-action'(props: { item: MenuGroupItem }): any
  'item-icon'(props: { item: MenuItem }): any
  'item-label'(props: { item: MenuItem }): any
  'item-help'(props: { item: MenuItem }): any
}>()
</script>
