<template>
  <ToastProvider>
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      v-bind="rootProps(toast)"
      :class="toast.dismissible === false ? 'pr-3' : ''"
    >
      <ToastIcon v-if="!toast.removeIcon" :type="resolveToastType(toast)" />
      <div class="grid gap-1 flex-1 min-w-0">
        <ToastTitle v-if="toast.title">
          {{ toast.title }}
        </ToastTitle>
        <template v-if="toast.description">
          <ToastDescription v-if="isVNode(toast.description)">
            <component :is="toast.description" />
          </ToastDescription>
          <ToastDescription v-else>
            {{ toast.description }}
          </ToastDescription>
        </template>
      </div>
      <component :is="toast.action" v-if="toast.action" class="shrink-0 self-center" />
      <ToastClose v-if="toast.dismissible !== false" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>

<script setup lang="ts">
import { isVNode } from 'vue'
import { useToast } from './useToast'
import { Toast, ToastClose, ToastDescription, ToastIcon, ToastProvider, ToastTitle, ToastViewport, resolveToastType } from '.'
import type { ToasterToast } from './useToast'

const { toasts } = useToast()

// Everything the viewport renders itself is kept off `ToastRoot`, so it doesn't
// leak onto the DOM node as an attribute.
const rootProps = (toast: ToasterToast) => {
  const { id: _id, title: _title, description: _description, action: _action, ...delegated } = toast

  return delegated
}
</script>
