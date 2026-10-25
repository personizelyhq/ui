<template>
  <Form class="w-2/3" @submit="submit">
    <FormField
      v-slot="{ componentField }"
      name="name"
      required
      label="Your name"
      description="Please provide the full name as in your passport."
    >
      <Input placeholder="e.g. Sergiu Cazac" v-bind="componentField" />
    </FormField>

    <FormField
      v-slot="{ componentField }"
      required
      name="framework"
      label="Your favorite framework"
    >
      <Select placeholder="Choose a value" v-bind="componentField" :options="['Nuxt.js', 'Vue.js', 'Next.js', 'React']" />
    </FormField>

    <FormField
      v-slot="{ componentField }"
      required
      name="accept"
    >
      <Checkbox label="I accept the terms of use." v-bind="componentField" />
    </FormField>

    <Button>Submit</Button>
  </Form>
</template>
<script setup lang="ts">
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { object, string, literal } from 'zod'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(object({
    name: string().min(2).max(50),
    framework: string(),
    accept: literal(true)
  }))
})

const submit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>
