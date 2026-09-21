import '@/assets/index.css'
import type { App, Component } from 'vue'

import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Alert } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { AlertDialog, AlertDialogProvider, useAlertDialog } from '@/components/ui/alert-dialog'
import { Autocomplete } from '@/components/ui/autocomplete'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { Color, ColorPicker, Gradient, Checkboard } from '@/components/ui/color-picker'
import { Combobox } from '@/components/ui/combobox'
import { DatePicker } from '@/components/ui/date-picker'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Dialog } from '@/components/ui/dialog'
import { Drawer } from '@/components/ui/drawer'
import { DropdownMenu, DropdownCheckboxGroupMenu, DropdownRadioGroupMenu, type MenuItem } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { FileUploadButton } from '@/components/ui/file-upload-button'
import { Icon } from '@/components/ui/icon'
import { Form, FormField } from '@/components/ui/form'
import { Pagination } from '@/components/ui/pagination'
import { Popover } from '@/components/ui/popover'
import { Progress, ProgressIndicator } from '@/components/ui/progress'
import { ProgressCircular } from '@/components/ui/progress-circular'
import { RadioGroup } from '@/components/ui/radio-group'
import { Select } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Toaster, ToastAction, ToastIcon, useToast } from '@/components/ui/toast'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip'
import { type Options, setOptions } from './options-provider'
import { type Option } from '@/utils/options'

const components: { [key:string]: Component } = {
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  AlertDialogProvider,
  AlertDialog,
  Autocomplete,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Color,
  ColorPicker,
  Gradient,
  Checkboard,
  Combobox,
  DatePicker,
  DateRangePicker,
  Dialog,
  Drawer,
  DropdownMenu,
  DropdownCheckboxGroupMenu,
  DropdownRadioGroupMenu,
  Input,
  Icon,
  Form,
  FormField,
  FileUploadButton,
  Pagination,
  Popover,
  Progress,
  ProgressIndicator,
  ProgressCircular,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  TooltipProvider,
  Tooltip
}

export function install (app: App, options: Options = {}) {
  setOptions(options)

  Object.keys(components).forEach((key) => {
    const Component = components[key]
    app.component(`Ui${key}`, Component)
  })
}

export default {
  install
}

export {
  components,
  useAlertDialog,
  useToast,
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  AlertDialog,
  AlertDialogProvider,
  Autocomplete,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Color,
  ColorPicker,
  Combobox,
  DatePicker,
  DateRangePicker,
  Dialog,
  Drawer,
  DropdownMenu,
  DropdownCheckboxGroupMenu,
  DropdownRadioGroupMenu,
  Input,
  Icon,
  FileUploadButton,
  Form,
  FormField,
  Pagination,
  Popover,
  Progress,
  ProgressIndicator,
  ProgressCircular,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  Textarea,
  Toaster,
  ToastAction,
  ToastIcon,
  Toggle,
  ToggleGroup,
  Tooltip,
  TooltipProvider
}

export type {
  Option,
  Options,
  MenuItem
}
