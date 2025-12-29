import { defineConfig, postcssIsolateStyles } from 'vitepress'
import { fileURLToPath, URL } from 'url'
import tailwindcssVite from '@tailwindcss/vite'
import tailwindcssPostCss from '@tailwindcss/postcss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Personizely UI',
  description: 'Personizely UI - Beautiful set of components.',
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcssPostCss(),
          postcssIsolateStyles({
            prefix: ':not(:where(.vp-raw, .vp-raw *, [id^="reka"], [id^="reka"] *), :where([data-reka-popper-content-wrapper], [data-reka-popper-content-wrapper] *))',
            includeFiles: [/vp-doc\.css/, /base\.css/]
          })
        ]
      }
    },
    plugins: [
      tailwindcssVite()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    outline: {
      level: [2, 3]
    },

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Alert', link: '/components/alert' },
          { text: 'Alert dialog', link: '/components/alert-dialog' },
          { text: 'Autocomplete', link: '/components/autocomplete' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Button', link: '/components/button' },
          { text: 'Card', link: '/components/card' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Checkbox group', link: '/components/checkbox-group' },
          { text: 'Color picker', link: '/components/color-picker' },
          { text: 'Combobox', link: '/components/combobox' },
          { text: 'Date picker', link: '/components/date-picker' },
          { text: 'Date range picker', link: '/components/date-range-picker' },
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Drawer', link: '/components/drawer' },
          { text: 'Dropdown menu', link: '/components/dropdown-menu' },
          { text: 'File upload button', link: '/components/file-upload-button' },
          { text: 'Input', link: '/components/input' },
          { text: 'Icon', link: '/components/icon' },
          { text: 'Form', link: '/components/form' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'Popover', link: '/components/popover' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Progress circular', link: '/components/progress-circular' },
          { text: 'Radio group', link: '/components/radio-group' },
          { text: 'Select', link: '/components/select' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Toggle', link: '/components/toggle' },
          { text: 'Toggle group', link: '/components/toggle-group' },
          { text: 'Tooltip', link: '/components/tooltip' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/personizelyhq/ui' }
    ]
  }
})
