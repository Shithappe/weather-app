// import { ref, watch } from 'vue'

// export const useDarkMode = () => {
//   const isDark = ref(true)

//   if (process.client) {
//     // Инициализация
//     document.documentElement.classList.toggle('dark', isDark.value)

//     // Отслеживание изменений
//     watch(isDark, (newValue) => {
//       document.documentElement.classList.toggle('dark', newValue)
//     })
//   }

//   return {
//     isDark
//   }
// }
