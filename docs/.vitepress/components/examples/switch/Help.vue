<template>
  <Switch v-model="value" label="This is a label" help="This is a help message for additional information." />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui/switch'

const value = ref(false)
</script>
