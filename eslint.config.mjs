import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt([
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-console': 'warn'
    }
  },

  prettierConfig
])