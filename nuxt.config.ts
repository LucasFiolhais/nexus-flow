export default defineNuxtConfig({
  ssr: false,
  devServer: {
    host: '127.0.0.1',
    port: 3000
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      },
      hmr: false
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
