<template>
  <AlertDialog
    v-for="(item, index) in items"
    :key="index"
    :title="item.title"
    :description="item.description"
    :confirm-text="item.confirmText"
    :cancel-text="item.cancelText"
    :default-open="true"
    @confirm="confirm(item)"
    @cancel="cancel(item)"
  />
</template>

<script setup lang="ts">
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue'
import { useAlertDialog, type Item } from '@/components/ui/alert-dialog/useAlertDialog'

const { items } = useAlertDialog()

const confirm = async (item: Item) => {
  await item.onConfirm()
  items.splice(items.indexOf(item), 1)
}
const cancel = (item: Item) => {
  item.onCancel?.()
  items.splice(items.indexOf(item), 1)
}
</script>
