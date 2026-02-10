<script setup>
import Basic from '../.vitepress/components/examples/dropdown-menu/Basic.vue'
import Position from '../.vitepress/components/examples/dropdown-menu/Position.vue'
import Model from '../.vitepress/components/examples/dropdown-menu/Model.vue'
import Radio from '../.vitepress/components/examples/dropdown-menu/Radio.vue'
import Checkbox from '../.vitepress/components/examples/dropdown-menu/Checkbox.vue'
import GroupAction from '../.vitepress/components/examples/dropdown-menu/GroupAction.vue'
</script>

# Dropdown menu

Popover to show some collateral info about something.

## Examples

### Basic dropdown menu
<Example>
  <Basic />
</Example>

**Code**

<<< @/.vitepress/components/examples/dropdown-menu/Basic.vue

### Custom position
<Example>
  <Position />
</Example>

**Code**

<<< @/.vitepress/components/examples/dropdown-menu/Position.vue

### Menu controlled by v-model
<Example>
  <Model />
</Example>

**Code**

<<< @/.vitepress/components/examples/dropdown-menu/Model.vue

### Group with actions

Use the `group-action` slot to add custom actions at the bottom of each group.

<Example>
  <GroupAction />
</Example>

**Code**

<<< @/.vitepress/components/examples/dropdown-menu/GroupAction.vue

### Menu with a radio group

<Example>
  <Radio />
</Example>

**Code**

<<< @/.vitepress/components/examples/dropdown-menu/Radio.vue

### Menu with a checkbox group

<Example>
  <Checkbox />
</Example>

**Code**

<<< @/.vitepress/components/examples/dropdown-menu/Checkbox.vue
