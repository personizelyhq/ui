<template>
  <Button
    @click="toast({ type: 'error', title: 'Something went wrong', description: 'The item could not be added.' })"
  >
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()
</script>
