<template>
  <Button
    @click="toast({
      type: 'warning',
      dismissible: false,
      duration: Infinity,
      title: 'Your session expired',
      description: 'Reload the page to keep working.',
      action: h(ToastAction, {
        altText: 'Reload',
        onClick () {
          dismiss()
        }
      }, {
        default: () => 'Reload',
      })
    })"
  >
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ToastAction, useToast } from '@/components/ui/toast'
import { h } from 'vue'

const { toast, dismiss } = useToast()
</script>
