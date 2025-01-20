<script setup>
import { useWeather } from '@/composables/useWeather'
import { onMounted, watch } from 'vue'
import CurrentForecast from '~/components/CurrentForecast.vue'
import LineChart from '~/components/LineChart.vue'
import WeeklyForecast from '~/components/WeeklyForecast.vue'

const props = defineProps(['location'])

const {
  current,
  daily,
  hourly,
  isLoading,
  error,
  fetchWeather
} = useWeather()

// Пример получения погоды при монтировании компонента
onMounted(async () => {
  try {
    await fetchWeather(
      props.location.lat,
      props.location.lon,
      {
        exclude: ['minutely', 'alerts'],
        units: 'metric'
      },
    )
  } catch (e) {
    console.error('Failed to fetch weather:', e)
  }
})

watch(() => props.location, async (location) => {
  try {
    await fetchWeather(
      location.lat,
      location.lon,
      {
        exclude: ['minutely', 'alerts'],
        units: 'metric'
      },
    )
  } catch (e) {
    console.error('Failed to fetch weather:', e)
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else>
      <el-tabs>
        <el-tab-pane label="Текущая погода">
          <CurrentForecast :current="current" />
        </el-tab-pane>
        <el-tab-pane label="Почасовой прогноз">
            <HourlyForecast v-if="hourly" :hourly="hourly" />
        </el-tab-pane>
        <el-tab-pane label="Недельный прогноз">
          <WeeklyForecast :daily="daily" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
