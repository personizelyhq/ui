<script setup>
import Basic from '../.vitepress/components/examples/alert/Basic.vue'
import Title from '../.vitepress/components/examples/alert/Title.vue'
import Error from '../.vitepress/components/examples/alert/Error.vue'
import Warning from '../.vitepress/components/examples/alert/Warning.vue'
import Success from '../.vitepress/components/examples/alert/Success.vue'
import WithoutIcon from '../.vitepress/components/examples/alert/WithoutIcon.vue'
import Actions from '../.vitepress/components/examples/alert/Actions.vue'
import NonDismissible from '../.vitepress/components/examples/alert/NonDismissible.vue'
</script>

# Alert

Alerts are used to show an inline alert or message.

## Examples

### Basic alert
<Example>
  <Basic />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/Basic.vue

### Alert with a title
<Example>
  <Title />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/Title.vue

### Error alert
<Example>
  <Error />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/Error.vue

### Warning alert
<Example>
  <Warning />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/Warning.vue

### Success alert
<Example>
  <Success />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/Success.vue

### Alert without icon
<Example>
  <WithoutIcon />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/WithoutIcon.vue

### Non-dismissible alert
<Example>
  <NonDismissible />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/NonDismissible.vue

### Alert with actions
Put buttons in the `actions` slot: they are centered next to the text, and their size does not move it away from the icon.

<Example>
  <Actions />
</Example>

**Code**

<<< @/.vitepress/components/examples/alert/Actions.vue
