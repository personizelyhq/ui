<template>
  <Button
    @click="toast({ removeIcon: true, description: 'Copied to clipboard.' })"
  >
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()
</script>
