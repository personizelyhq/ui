<template>
  <div
    :class="
      cn(
        'rounded border bg-card text-card-foreground shadow-xs flex flex-col gap-4 p-8',
        props.class,
        props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      )
    "
    :aria-disabled="props.disabled"
  >
    <CardHeader v-if="$slots.header || $slots.title || $slots.description || title || description">
      <slot name="header">
        <CardTitle v-if="title || $slots.title">
          <slot name="title">
            {{ title }}
          </slot>
        </CardTitle>
        <CardDescription v-if="description || $slots.description">
          <slot name="description">
            {{ description }}
          </slot>
        </CardDescription>
        <CardTray v-if="$slots.tray">
          <slot name="tray" />
        </CardTray>
      </slot>
    </CardHeader>
    <CardContent v-if="$slots.default" :class="loading && 'relative [&>*:not(:last-child)]:opacity-20'">
      <slot />
      <ProgressCircular v-if="loading" class="size-5 top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2" />
    </CardContent>
    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'
import CardDescription from './CardDescription.vue'
import CardContent from './CardContent.vue'
import CardFooter from './CardFooter.vue'
import CardTitle from './CardTitle.vue'
import CardHeader from './CardHeader.vue'
import CardTray from './CardTray.vue'
import ProgressCircular from '@/components/ui/progress-circular/ProgressCircular.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title?: string
  description?: string
  loading?: boolean
  disabled?: boolean
}>()
</script>
