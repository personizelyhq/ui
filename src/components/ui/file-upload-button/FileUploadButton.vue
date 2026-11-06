<template>
  <div class="inline-flex">
    <Button
      type="button"
      v-bind="forwardedProps"
      @click="input!.click()"
    >
      <template v-if="$slots.default" #default>
        <slot />
      </template>
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template v-if="$slots.tooltip" #tooltip>
        <slot name="tooltip" />
      </template>
    </Button>
    <input
      v-show="false"
      ref="input"
      type="file"
      :accept="accept"
      :name="name"
      :multiple="multiple"
      @change="$emit('change', $event)"
    >
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { type ButtonProps } from '@/components/ui/button/Button.vue'
import { ref } from 'vue'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useForwardProps } from 'reka-ui'

const input = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<ButtonProps & {
  accept?: string
  name: string,
  multiple?: boolean
}>(), {
  loading: false,
  disabled: false,
  iconPosition: 'left',
  multiple: false,
  icon: 'upload'
})
defineEmits<{
  change: [event: Event]
}>()

const delegatedProps = useDelegatedProps(props, ['accept', 'name', 'multiple'])
const forwardedProps = useForwardProps(delegatedProps)
</script>
