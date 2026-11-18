<template>
  <AlertDialogRoot v-bind="forwarded">
    <AlertDialogTrigger as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogContent :class="props.class">
      <div class="flex flex-col gap-y-2 text-center sm:text-left">
        <AlertDialogTitle class="text-lg font-medium">
          <slot name="title">
            {{ title }}
          </slot>
        </AlertDialogTitle>
        <AlertDialogDescription class="text-sm text-muted-foreground">
          <slot name="description">
            {{ description }}
          </slot>
        </AlertDialogDescription>
      </div>
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2">
        <AlertDialogCancel as-child @click="$emit('cancel')">
          <Button variant="outline">
            {{ cancelText }}
          </Button>
        </AlertDialogCancel>
        <AlertDialogAction as-child @click="$emit('confirm')">
          <Button variant="default">
            {{ confirmText }}
          </Button>
        </AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import {
  type AlertDialogEmits,
  type AlertDialogProps,
  AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from 'reka-ui'
import AlertDialogContent from './AlertDialogContent.vue'
import { Button } from '@/components/ui/button'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<AlertDialogProps & {
  class?: HTMLAttributes['class'],
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
}>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel'
})
const emits = defineEmits<AlertDialogEmits & {
  confirm: []
  cancel: []
}>()

const delegatedProps = useDelegatedProps(props, ['class', 'title', 'description', 'confirmText', 'cancelText'])
const delegatedEmits = useEmitAsProps(emits, ['confirm', 'cancel'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)
</script>
