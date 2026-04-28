<template>
  <DatePicker v-model="value" :is-date-disabled="isDateDisabled" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@/components/ui/date-picker'
import { type DateValue, isWeekend } from '@internationalized/date'

const value = ref<DateValue>(null)

const isDateDisabled = (date: DateValue) => isWeekend(date, 'en-US')
</script>
