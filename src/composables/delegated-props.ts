import { type MaybeRefOrGetter, computed } from 'vue'
import omit from 'lodash/omit'

export function useDelegatedProps<T extends Record<string, any>, K extends string = never> (props: MaybeRefOrGetter<T>, exclude: Array<K> = []) {
  return computed(() => omit(props, exclude) as Omit<T, K>)
}
