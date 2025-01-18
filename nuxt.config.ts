export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' }
      ],
      htmlAttrs: {
        lang: 'ru'
      }
    },
  },

  // Конфигурация Element Plus
  elementPlus: {
    importStyle: 'scss',
    themes: ['dark'],
    components: [
      'ElContainer',
      'ElHeader',
      'ElMain',
      'ElFooter',
      'ElButton',
      'ElDropdown',
      'ElDropdownMenu',
      'ElDropdownItem'
    ], 
    noStylesComponents: [] // Компоненты без стилей
  },

  // Конфигурация SSR
  ssr: true,

  // Конфигурация сборки
  build: {
    transpile: ['element-plus/es']
  },

  // Настройка CSS
  css: [
    '@/assets/css/tailwind.css',
    'element-plus/theme-chalk/src/index.scss'
  ],

  // Настройка вебпака для SSR
  vite: {
    ssr: {
      noExternal: ['element-plus']
    }
  },

  compatibilityDate: '2025-01-18'
})