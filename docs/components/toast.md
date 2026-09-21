<script setup>
import Basic from '../.vitepress/components/examples/toast/Basic.vue'
import Success from '../.vitepress/components/examples/toast/Success.vue'
import Warning from '../.vitepress/components/examples/toast/Warning.vue'
import Error from '../.vitepress/components/examples/toast/Error.vue'
import WithoutIcon from '../.vitepress/components/examples/toast/WithoutIcon.vue'
import Action from '../.vitepress/components/examples/toast/Action.vue'
import NonDismissible from '../.vitepress/components/examples/toast/NonDismissible.vue'
import { Toaster } from '../../src/components/ui/toast'
</script>

<teleport to="#portal">
  <Toaster />
</teleport>

# Toast

Shows a toast message in the corner.
You need to have a `<Toaster />` component on your page.

Toasts share their types and icons with [Alert](./alert.md): `info` (the default), `success`,
`warning` and `error`. The accent shows up in the icon, the border and a faint surface tint, so an
error reads as an error without shouting.

## Examples

### Basic toast
<Example>
  <Basic />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Basic.vue

### Success toast
<Example>
  <Success />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Success.vue

### Warning toast
<Example>
  <Warning />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Warning.vue

### Error toast
<Example>
  <Error />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Error.vue

### Toast without icon
<Example>
  <WithoutIcon />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/WithoutIcon.vue

### Toast with an action
<Example>
  <Action />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Action.vue

### Non-dismissible toast

Two separate things keep a toast on screen, and they are opt-in:

- `dismissible: false` removes the close button and blocks swipe and <kbd>Escape</kbd>, so the user
  cannot dismiss it.
- `duration: Infinity` stops it auto-closing, so it waits instead of timing out. Useful on its own
  for a toast whose action needs time to be acted on.

Use `dismissible: false` only when the action itself resolves the toast — combined with
`duration: Infinity` there is otherwise no way out of it.

<Example>
  <NonDismissible />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/NonDismissible.vue
