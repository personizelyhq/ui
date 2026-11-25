<template>
  <div v-if="visible" :class="cn(alertVariants({ type }), dismissible ? 'pr-12' : '', props.class)" role="alert">
    <slot name="icon" />
    <div :class="[!removeIcon ? 'pl-7' : '', $slots.actions ? 'flex flex-wrap items-center justify-between gap-3' : '']">
      <div class="relative" :class="$slots.actions ? 'min-w-0 flex-[1_1_10rem]' : ''">
        <!-- As tall as the first line, the title or the text, to center the icon on it -->
        <span
          v-if="!removeIcon && !$slots.icon"
          class="absolute -left-6.5 top-0 flex items-center h-[1lh]"
          :class="isTitled ? 'leading-tight' : 'text-sm leading-normal'"
        >
          <component :is="icon" :class="iconVariants({ type })" />
        </span>
        <h5 v-if="isTitled" class="font-medium text-foreground leading-tight tracking-tight">
          <slot name="title">
            {{ title }}
          </slot>
        </h5>
        <div class="text-sm text-muted-foreground leading-normal">
          <slot />
        </div>
      </div>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
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
import { computed, useSlots } from 'vue'
import { Button } from '@/components/ui/button'
import { Info, TriangleAlert, CircleCheck, CircleAlert } from '@lucide/vue'
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

const slots = useSlots()
const isTitled = computed(() => !!(props.title || slots.title))

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

