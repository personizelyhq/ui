<template>
  <Alert :dismissible="false">
    A new version is available.

    <template #actions>
      <Button size="sm" variant="secondary">
        Refresh
      </Button>
    </template>
  </Alert>
</template>
<script setup lang="ts">
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
</script>
