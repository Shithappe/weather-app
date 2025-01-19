import { ref, computed } from 'vue'
import { weatherService } from '@/services/weather'

export const useWeather = () => {
  const weatherKey = useRuntimeConfig().public.weatherKey

  const weatherData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Вычисляемые свойства для удобного доступа к данным
  const current = computed(() => weatherData.value?.current)
  const daily = computed(() => weatherData.value?.daily)
  const hourly = computed(() => weatherData.value?.hourly)
  
  const fetchWeather = async (lat: number, lon: number, options = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      weatherData.value = await weatherService.getWeather(
        {
          lat,
          lon,
          ...options,
        },
        weatherKey
      );
    } catch (e) {
      error.value = e
      weatherData.value = null
    } finally {
      isLoading.value = false
    }
  }

  const clearWeather = () => {
    weatherData.value = null
    error.value = null
  }

  return {
    weatherData,
    current,
    daily,
    hourly,
    isLoading,
    error,
    fetchWeather,
    clearWeather
  }
}