<template>
  <div v-if="visible" :class="cn(alertVariants({ type }), dismissible ? 'pr-12' : '', props.class)" role="alert">
    <slot name="icon">
      <component
        :is="icon"
        v-if="!removeIcon"
        :class="iconVariants({ type })"
      />
    </slot>
    <h5 v-if="title || $slots.title" class="font-medium text-foreground leading-tight tracking-tight" :class="!removeIcon ? 'pl-7' : ''">
      <slot name="title">
        {{ title }}
      </slot>
    </h5>
    <div :class="!removeIcon ? 'pl-7' : ''" class="text-sm text-muted-foreground leading-normal">
      <slot />
    </div>
    <Button
      v-if="dismissible"
      icon="x"
      variant="ghost"
      size="2xs"
      class="absolute right-2 top-2"
      type="button"
      @click="dismiss"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Info, TriangleAlert, CircleCheck, CircleAlert } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'
import { type AlertVariants, alertVariants, iconVariants } from '.'
import { cn } from '@/utils/tailwind'

const emit = defineEmits(['update:visible', 'dismiss'])

const props = withDefaults(defineProps<{
  type?: AlertVariants['type'],
  class?: HTMLAttributes['class'],
  removeIcon?: boolean,
  title?: string,
  dismissible?: boolean,
  visible?: boolean
}>(), {
  type: 'info',
  removeIcon: false,
  dismissible: true,
  visible: true
})

const icon = computed(() => {
  return {
    info: Info,
    warning: TriangleAlert,
    success: CircleCheck,
    error: CircleAlert
  }[props.type!]
})

const dismiss = () => {
  emit('update:visible', false)
  emit('dismiss')
}
</script>

