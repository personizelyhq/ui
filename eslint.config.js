import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'docs/.vitepress/cache/**/*',
      'docs/.vitepress/dist/**/*',
      'dist/**/*'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}']
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      stylistic
    },
    rules: {
      'stylistic/arrow-parens': [
        'error',
        'as-needed',
        {
          requireForBlockBody: true
        }
      ],
      'stylistic/arrow-spacing': [
        'error'
      ],
      'stylistic/comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      'stylistic/no-extra-semi': [
        'error'
      ],
      'stylistic/brace-style': [
        'error'
      ],
      'stylistic/max-statements-per-line': [
        'error',
        {
          max: 1
        }
      ],
      'stylistic/multiline-ternary': [
        'error',
        'always-multiline'
      ],
      'stylistic/comma-style': [
        'error',
        'last'
      ],
      'stylistic/dot-location': [
        'error',
        'property'
      ],
      'stylistic/new-parens': [
        'error',
        'always'
      ],
      'stylistic/lines-between-class-members': [
        'error',
        'always'
      ],
      'stylistic/semi': [
        'error',
        'never'
      ],
      'stylistic/function-call-argument-newline': [
        'error',
        'never'
      ],
      'stylistic/function-paren-newline': [
        'error',
        'never'
      ],
      'stylistic/function-call-spacing': [
        'error',
        'never'
      ],
      'stylistic/computed-property-spacing': [
        'error',
        'never'
      ],
      'stylistic/indent': [
        'error',
        2
      ],
      'stylistic/space-unary-ops': [
        'error',
        {
          words: true,
          nonwords: false
        }
      ],
      'stylistic/keyword-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],
      'stylistic/space-in-parens': [
        'error',
        'never'
      ],
      'stylistic/quotes': [
        'error',
        'single'
      ],
      'stylistic/space-infix-ops': [
        'error',
        {
          int32Hint: false
        }
      ],
      'stylistic/space-before-function-paren': [
        'error',
        'always'
      ],
      'stylistic/comma-dangle': [
        'error',
        'never'
      ],
      'stylistic/array-bracket-spacing': [
        'error',
        'never'
      ],
      'stylistic/array-bracket-newline': [
        'error',
        'consistent'
      ],
      'stylistic/rest-spread-spacing': [
        'error',
        'never'
      ],
      'stylistic/key-spacing': [
        'error'
      ],
      'stylistic/no-multi-spaces': [
        'error'
      ],
      'stylistic/no-mixed-operators': [
        'error'
      ],
      'stylistic/no-floating-decimal': [
        'error'
      ],
      'stylistic/quote-props': [
        'error',
        'as-needed'
      ],
      'stylistic/block-spacing': [
        'error'
      ],
      'stylistic/object-curly-spacing': [
        'error',
        'always'
      ]
    }
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': [0]
    }
  },
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3
          },
          multiline: {
            max: 1
          }
        }
      ],
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          ignoreWhenNoAttributes: true
        }
      ],
      'vue/order-in-components': [
        'error',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            [
              'delimiters',
              'comments'
            ],
            [
              'components',
              'directives',
              'filters'
            ],
            'extends',
            'mixins',
            [
              'provide',
              'inject'
            ],
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            [
              'props',
              'propsData'
            ],
            'emits',
            'setup',
            'asyncData',
            'data',
            'fetch',
            'head',
            'computed',
            'methods',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'ROUTER_GUARDS',
            [
              'template',
              'render'
            ],
            'renderError'
          ]
        }
      ],
      'vue/block-order': ['error', {
        order: [
          'template', 'script', 'style'
        ]
      }],
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-mutating-props': 'off'
    }
  }
]
