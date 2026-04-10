export default defineNuxtConfig({
  ssr: false,

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  nitro: {
    preset: 'service-worker'
  },

  vite: {
    server: {
      watch: {
        usePolling: true
      },
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0'
      }
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint'
  ]
})
