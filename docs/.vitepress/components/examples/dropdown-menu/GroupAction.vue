<template>
  <TooltipProvider :delay-duration="100">
    <DropdownMenu :items="items" @select="onSelect">
      <template #trigger>
        <Button>Pages</Button>
      </template>
      <template #group-action="{ item }">
        <Button
          variant="ghost"
          size="xs"
          icon="trash"
          tooltip="Remove"
          class="mr-1"
          @click="onRemove(item)"
        >
        </Button>
      </template>
    </DropdownMenu>
  </TooltipProvider>
</template>
<script setup lang="ts">
import { DropdownMenu, type MenuItem, type MenuGroupItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'

const onSelect = (item: MenuItem) => {
  alert(item.label + ' was selected.')
}

const onRemove = (item: MenuGroupItem) => {
  alert(item.label + ' was removed.')
}

const items: MenuGroupItem[] = [
  {
    label: 'Homepage',
    items: [
      { label: 'Original' },
      { label: 'Variation 1' }
    ]
  },
  {
    label: 'Product pages',
    items: [
      { label: 'Original' },
      { label: 'Variation 1' }
    ]
  }
]
</script>
