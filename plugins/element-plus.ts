import { ID_INJECTION_KEY } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: 1000,
    current: 0,
  })
})