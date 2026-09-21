<template>
  <Button
    @click="toast({ type: 'warning', title: 'Almost out of space', description: 'You have used 90% of your quota.' })"
  >
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()
</script>
