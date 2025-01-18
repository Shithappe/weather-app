// export const useWeatherSettings = () => {
//   const settings = inject('weatherSettings')
  
//   if (!settings) {
//     throw new Error('Weather settings not provided!')
//   }
  
//   // Функция для конвертации температуры
//   const convertTemperature = (celsius: number): number => {
//     if (settings.isCelsius.value) {
//       return celsius
//     }
//     return (celsius * 9/5) + 32
//   }
  
//   // Функция для получения символа единицы измерения
//   const getUnitSymbol = (): string => {
//     return settings.isCelsius.value ? '°C' : '°F'
//   }
  
//   return {
//     isDark: settings.isDark,
//     isCelsius: settings.isCelsius,
//     convertTemperature,
//     getUnitSymbol
//   }
// }