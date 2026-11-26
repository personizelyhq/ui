<template>
  <div :class="['flex gap-x-2', help || $slots.help ? 'items-start' : 'items-center']">
    <SwitchBase
      :id="id"
      v-model="modelValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <div v-if="help || $slots.help" class="grid gap-1">
      <!-- As tall as the switch, so the label stays centered on it while the help message goes under the label -->
      <Label :for="id" class="flex min-h-5 items-center">
        <slot>{{ label }}</slot>
      </Label>
      <p class="text-sm text-muted-foreground">
        <slot name="help">
          {{ help }}
        </slot>
      </p>
    </div>
    <Label v-else-if="label || $slots.default" :for="id">
      <slot>{{ label }}</slot>
    </Label>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import SwitchBase from './SwitchBase.vue'
import { useId } from 'reka-ui'
import type { Events } from 'vue'

const modelValue = defineModel<boolean>()
withDefaults(defineProps<{
  name?: string
  id?: string
  label?: string
  help?: string
  value?: string
  required?: boolean
  disabled?: boolean
}>(), {
  id: () => useId()
})
defineEmits<{
  focus: [event: Events['onFocus']]
  blur: [event: Events['onBlur']]
}>()
</script>
