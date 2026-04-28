<template>
  <Popover class="p-0" v-model:open="open">
    <template #trigger>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
          props.class
        )"
      >
        <template #icon>
          <CalendarIcon class="size-3 min-w-3" />
        </template>
        <slot v-if="modelValue" name="label">
          <span class="truncate">{{ formatter.format(modelValue.toDate(getLocalTimeZone())) }}</span>
        </slot>
        <template v-else>
          <span class="truncate">{{ placeholder }}</span>
        </template>
      </Button>
    </template>
    <Calendar
      v-bind="forwarded"
      v-model="modelValue"
      :multiple="false"
      @update:modelValue="open = false"
    />
  </Popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone
} from '@internationalized/date'
import { type CalendarRootProps } from 'reka-ui'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { cn } from '@/utils/tailwind'
import { type HTMLAttributes, ref } from 'vue'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'

const emit = defineEmits(['update:placeholder'])
const modelValue = defineModel<DateValue>()
const props = withDefaults(defineProps<Omit<CalendarRootProps, 'placeholder' | 'modelValue' | 'multiple'> & {
  placeholder?: string
  class?: HTMLAttributes['class']
  formatter?: DateFormatter
}>(), {
  placeholder: 'Pick a date',
  initialFocus: true,
  formatter: () => new DateFormatter('en-US', {
    dateStyle: 'long'
  })
})

const delegatedProps = useDelegatedProps(props, ['class', 'placeholder', 'formatter'])
const delegatedEmits = useEmitAsProps(emit)
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)

const open = ref(false)
</script>
