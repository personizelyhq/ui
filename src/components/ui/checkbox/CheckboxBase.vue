<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', props.class)"
    @change.stop
    @input.stop
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <slot name="indicator">
        <Check class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import {
  CheckboxIndicator,
  CheckboxRoot,
  type CheckboxRootEmits,
  type CheckboxRootProps,
  useId,
  useForwardPropsEmits
} from 'reka-ui'
import { Check } from '@lucide/vue'
import { cn } from '@/utils/tailwind'
import { useDelegatedProps } from '@/composables/delegated-props'

const props = withDefaults(defineProps<CheckboxRootProps & {
  class?: HTMLAttributes['class']
}>(), {
  id: () => useId()
})
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = useDelegatedProps(props, ['class'])
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
