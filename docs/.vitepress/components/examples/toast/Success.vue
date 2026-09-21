<template>
  <Button
    @click="toast({ type: 'success', title: 'Saved', description: 'Item successfully added!' })"
  >
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()
</script>
