import { reactive } from 'vue'

export interface Item {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => any
  onCancel?: () => any
}

const items = reactive<Item[]>([])

export const useAlertDialog = () => {
  return {
    confirm (item: Item) {
      items.push(item)
    },
    items
  }
}
