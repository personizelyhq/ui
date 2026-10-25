<template>
  <ComboboxRoot
    v-bind="forwarded"
    v-model="modelValue"
    v-model:open="open"
    :reset-search-term-on-blur="false"
    @update:open="onToggle"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger
        ref="button"
        role="combobox"
        :aria-disabled="disabled"
        :aria-expanded="open"
        :tabindex="null"
        :class="cn('flex gap-1.5 h-8 text-left items-center w-full justify-between rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:break-all',
                   (multiple && Array.isArray(modelValue) && modelValue.length === 0) || !modelValue ? 'text-muted-foreground' : '',
                   props.class
        )"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
        <span class="pointer-events-none">
          <slot v-if="multiple && Array.isArray(modelValue) && (modelValue.length || $slots.label)" name="label" v-bind="{ options: selectedOptions }">
            {{ selectedOptionsLabel || modelValue!.length + ' selected' }}
          </slot>
          <slot v-else-if="!multiple && (modelValue || $slots.label)" name="label" v-bind="{ option: selectedOption }">
            {{ selectedOptionLabel || modelValue }}
          </slot>
          <template v-else>
            {{ placeholder }}
          </template>
        </span>
        <ChevronDown class="w-4 h-4 min-w-4 opacity-50" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal :disabled="disablePortal" :to="opts.portalTo">
      <ComboboxContent :side-offset="5">
        <ComboboxInput
          class="border-b"
          :model-value="searchTerm"
          :placeholder="searchPlaceholder"
          :loading="loading"
          :display-value="() => ''"
          @update:model-value="(v: string) => {
          if (v !== searchTerm) {
            searchTerm = v
          }
        }"
          @change.stop
          @input.stop
          @keydown.tab.prevent
        />
        <ComboboxViewport class="max-h-[300px] overflow-y-auto overflow-x-hidden">
          <ComboboxEmpty />

          <ComboboxGroup class="p-1 empty:p-0">
            <ComboboxItem
              v-for="(option, index) in preparedOptions"
              :key="option[keys.id] || option[keys.value] || index"
              :value="option[keys.value]"
              :disabled="option[keys.disabled] || disabled"
              @select="onSelect($event, option)"
            >
              <slot name="option" v-bind="{ option }">
                {{ option[keys.label] || option }}
              </slot>
              <ComboboxItemIndicator as-child>
                <Check class="ml-auto h-4 w-4 text-muted-foreground" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed, ref, type ComponentInstance } from 'vue'
import {
  ComboboxItemIndicator,
  ComboboxAnchor,
  ComboboxPortal,
  ComboboxTrigger,
  ComboboxViewport,
  type ComboboxItemEmits,
  type ComboboxRootEmits,
  type ComboboxRootProps,
  type ComboboxInputProps
} from 'reka-ui'
import { cn } from '@/utils/tailwind'
import ComboboxRoot from './ComboboxRoot.vue'
import ComboboxContent from './ComboboxContent.vue'
import ComboboxItem from './ComboboxItem.vue'
import ComboboxInput from './ComboboxInput.vue'
import ComboboxEmpty from './ComboboxEmpty.vue'
import ComboboxGroup from './ComboboxGroup.vue'
import { Check } from '@lucide/vue'
import { ChevronDown } from '@lucide/vue'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'
import { getOptions } from '@/options-provider'

const modelValue = defineModel<ComboboxRootProps['modelValue']>()
const searchTerm = defineModel<ComboboxInputProps['modelValue']>('searchTerm', { default: '' })

const props = withDefaults(defineProps<Omit<ComboboxRootProps, 'modelValue' | 'resetSearchTermOnBlur'> & {
  class?: HTMLAttributes['class']
  placeholder?: string
  loading?: boolean
  disablePortal?: boolean
  searchPlaceholder?: string
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
  disablePortal: false,
  loading: false,
  placeholder: 'Select a value...',
  searchPlaceholder: 'Search...',
  keys: () => ({
    id: 'id',
    label: 'label',
    help: 'help',
    value: 'value',
    disabled: 'disabled'
  })
})

const emits = defineEmits<Omit<ComboboxRootEmits, 'update:modelValue'> & {
  blur: [event: MouseEvent]
  focus: [event: MouseEvent]
  select: [option: Option | CustomOption],
  'update:searchTerm': [value: string]
}>()

const delegatedProps = useDelegatedProps(props, ['class', 'placeholder', 'searchPlaceholder', 'keys', 'options', 'disablePortal', 'searchTerm', 'modelValue'])
const delegatedEmits = useEmitAsProps(emits, ['blur', 'focus', 'select', 'update:searchTerm', 'update:modelValue'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)
const opts = getOptions()

defineSlots<{
  'label'(props: { option: CustomOption | undefined | null } | { options: Array<Option | CustomOption> }): any
  'option'(props: { option: Option | CustomOption }): any
}>()

const button = ref<ComponentInstance<typeof ComboboxTrigger>>()
const open = ref(false)

const onSelect = (_event: ComboboxItemEmits['select'][0], option: Option | CustomOption) => {
  emits('select', option)
}

const onToggle = (open: boolean) => {
  requestAnimationFrame(() => {
    if (!open) {
      button.value?.$el.focus()
    }
  })
}

const selectedOption = computed(() => {
  if (modelValue.value) {
    return preparedOptions.value.find((o) => {
      return o[props.keys.value] === modelValue.value
    })
  }

  return null
})

const selectedOptions = computed(() => {
  if (Array.isArray(modelValue.value)) {
    return preparedOptions.value.filter((o) => {
      return (<Array<unknown>>modelValue.value).includes(o[props.keys.value])
    })
  }

  return []
})

const selectedOptionLabel = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value[props.keys.label]
  }

  return null
})

const selectedOptionsLabel = computed(() => {
  if (selectedOptions.value) {
    return selectedOptions.value.map(o => o[props.keys.label]).join(', ')
  }

  return null
})

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
