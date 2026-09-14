<template>
  <Popover v-model:open="isOpen" class="p-0">
    <template #trigger>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue.start && 'text-muted-foreground',
          props.class
        )"
      >
        <template #icon>
          <CalendarIcon class="size-3 min-w-3" />
        </template>
        <slot v-if="modelValue.start" name="label">
          <span class="truncate">
            <template v-if="modelValue.end">
              {{ formatter.format(modelValue.start.toDate(getLocalTimeZone())) }} - {{ formatter.format(modelValue.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ formatter.format(modelValue.start.toDate(getLocalTimeZone())) }}
            </template>
          </span>
        </slot>
        <template v-else>
          <span class="truncate">{{ placeholder }}</span>
        </template>
      </Button>
    </template>
    <div class="flex">
      <div v-if="presets.length > 0" class="p-3 flex flex-col gap-1">
        <Button
          v-for="preset in presets"
          :key="preset.label"
          size="sm"
          :aria-selected="isSelectedPreset(preset.value)"
          :variant="isSelectedPreset(preset.value) ? 'secondary' : 'ghost'"
          class="justify-start min-w-28"
          @click="dateRange = preset.value"
        >
          {{ preset.label }}
        </Button>
      </div>
      <RangeCalendar
        v-bind="forwarded"
        v-model="dateRange"
        :number-of-months="2"
        :prevent-deselect="true"
      />
    </div>
    <div class="p-3 flex justify-end gap-2">
      <Button variant="ghost" size="sm" @click="reset">
        Reset
      </Button>
      <Button :disabled="!dateRange.start && !dateRange.end" size="sm" @click="apply">
        Apply
      </Button>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'
import {
  type DateRange,
  type RangeCalendarRootProps
} from 'reka-ui'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { cn } from '@/utils/tailwind'
import { type HTMLAttributes, type Ref, ref, watch } from 'vue'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Omit<RangeCalendarRootProps, 'placeholder' | 'modelValue'> & {
  placeholder?: string
  formatter?: DateFormatter
  class?: HTMLAttributes['class']
  modelValue: DateRange
  presets?: Array<{ label: string, value: DateRange }>
}>(), {
  placeholder: 'Pick a date range',
  initialFocus: false,
  defaultValue: () => ({ start: undefined, end: undefined }),
  numberOfMonths: 2,
  presets: () => [],
  formatter: () => new DateFormatter('en-US', {
    dateStyle: 'long'
  })
})

const delegatedProps = useDelegatedProps(props, ['class', 'placeholder', 'formatter', 'presets', 'modelValue'])
const delegatedEmits = useEmitAsProps(emit, ['update:modelValue'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)

const isOpen = ref(false)

const dateRange = ref({
  start: props.modelValue.start,
  end: props.modelValue.end
}) as Ref<DateRange>

watch(() => props.modelValue, (to) => {
  dateRange.value = {
    start: to ? to.start : undefined,
    end: to ? to.end : undefined
  }
})

const reset = () => {
  emit('update:modelValue', props.defaultValue)
  isOpen.value = false
}

const apply = () => {
  emit('update:modelValue', dateRange.value)
  isOpen.value = false
}

const isSelectedPreset = (value: DateRange) => {
  const { end, start } = dateRange.value
  return start && value.start
    ? start.compare(value.start) === 0
    : start === value.start
    && end && value.end
      ? end.compare(value.end) === 0
      : end === value.end
}
</script>
