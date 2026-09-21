<template>
  <Button
    @click="toast({ title: 'Heads up', description: 'Your export will be ready in a moment.' })"
  >
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()
</script>
