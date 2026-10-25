<template>
  <AutocompleteRoot
    v-bind="omit(forwarded, ['class', 'placeholder', 'searchPlaceholder', 'disableFilter', 'disablePortal', 'keys', 'options', 'autofocus', 'modelValue', 'onUpdate:modelValue'])"
    v-model="modelValue"
    v-model:open="open"
    :ignore-filter="disableFilter"
    :reset-search-term-on-blur="false"
  >
    <ComboboxAnchor :class="cn('flex h-8 items-center w-full justify-between rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:break-all', props.class)">
      <ComboboxInput
        ref="input"
        :model-value="selectedOption ? selectedOption[keys.label] : modelValue"
        :auto-focus="autofocus"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="cn(
          'flex h-8 w-full bg-transparent py-1 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          loading ? 'pe-8' : 'pe-2'
        )"
        @update:model-value="modelValue = $event"
      />
      <div v-if="loading" class="pointer-events-none">
        <ProgressCircular class="size-4 text-muted-foreground" />
      </div>

      <Primitive
        v-else-if="modelValue"
        as="button"
        class="focus:outline-hidden focus:ring-2 rounded focus:ring-ring focus:ring-offset-2"
        @click="reset"
      >
        <X class="w-4 h-4 opacity-50" />
      </Primitive>
    </ComboboxAnchor>

    <ComboboxPortal v-if="filteredOptions.length > 0" :disabled="disablePortal" :to="opts.portalTo">
      <AutocompleteContent :side-offset="5">
        <ComboboxViewport class="p-1 max-h-[300px] overflow-y-auto overflow-x-hidden">
          <AutocompleteEmpty />
          <AutocompleteGroup>
            <AutocompleteItem
              v-for="(option, index) in filteredOptions"
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
            </AutocompleteItem>
          </AutocompleteGroup>
        </ComboboxViewport>
      </AutocompleteContent>
    </ComboboxPortal>
  </AutocompleteRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed, ref, useTemplateRef } from 'vue'
import { Check } from '@lucide/vue'
import { X } from '@lucide/vue'
import omit from 'lodash/omit'
import {
  Primitive,
  ComboboxItemIndicator,
  ComboboxAnchor,
  ComboboxPortal,
  ComboboxViewport,
  ComboboxInput,
  type ComboboxItemEmits,
  type ComboboxRootEmits,
  type ComboboxRootProps,
  type ComboboxInputProps
} from 'reka-ui'
import { cn } from '@/utils/tailwind'
import AutocompleteRoot from './AutocompleteRoot.vue'
import AutocompleteContent from './AutocompleteContent.vue'
import AutocompleteItem from './AutocompleteItem.vue'
import AutocompleteGroup from './AutocompleteGroup.vue'
import AutocompleteEmpty from './AutocompleteEmpty.vue'
import { ProgressCircular } from '@/components/ui/progress-circular'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import { getOptions } from '@/options-provider'

const modelValue = defineModel<ComboboxRootProps['modelValue']>()
const searchTerm = defineModel<ComboboxInputProps['modelValue']>('searchTerm', { default: '' })

const props = withDefaults(defineProps<Omit<ComboboxRootProps, 'modelValue' | 'resetSearchTermOnBlur'> & {
  class?: HTMLAttributes['class']
  placeholder?: string
  loading?: boolean
  disableFilter?: boolean
  disablePortal?: boolean
  autofocus?: boolean
  searchPlaceholder?: string
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
  disableFilter: false,
  disablePortal: false,
  loading: false,
  autofocus: false,
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
  select: [option: Option | CustomOption]
}>()

const delegatedProps = useDelegatedProps(props, ['class', 'placeholder', 'loading', 'disableFilter', 'disablePortal', 'autofocus', 'searchPlaceholder', 'keys', 'options'])
const delegatedEmits = useEmitAsProps(emits, ['blur', 'focus', 'select', 'update:modelValue', 'update:searchTerm'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)
const opts = getOptions()

const open = ref(false)
const input = useTemplateRef<typeof ComboboxInput>('input')

const onSelect = (event: ComboboxItemEmits['select'][0], option: Option | CustomOption) => {
  modelValue.value = event.detail.value
  emits('select', option)
}

const reset = () => {
  modelValue.value = ''
  searchTerm.value = ''
  input.value?.$el.focus()
}

const selectedOption = computed(() => {
  if (modelValue.value) {
    return preparedOptions.value.find((o) => {
      return o[props.keys.value] === modelValue.value
    })
  }

  return null
})

const filterFunction = (options: any, searchTerm: string) => {
  if (!props.disableFilter) return options

  return options.filter((option: any) => {
    const result = preparedOptions.value.find((o: Option | CustomOption) => {
      return o[props.keys.value] === option
    })

    return result ? result[props.keys.label]?.toLowerCase().includes(searchTerm?.toLowerCase()) : false
  })
}

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
const filteredOptions = computed(() => filterFunction(preparedOptions.value, String(searchTerm.value)))
</script>
