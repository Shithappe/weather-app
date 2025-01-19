<script setup>
import { useWeather } from '@/composables/useWeather'
import { onMounted } from 'vue'
import { Sunny, ZoomIn, Watermelon, WindPower, PartlyCloudy, Watch } from '@element-plus/icons-vue'

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
          <div v-if="current" class="bg-[#2B4465] text-white p-6 rounded-lg">
            <!-- Main temperature display -->
            <div class="flex items-center gap-4 mb-6">
              <!-- <el-icon class="text-5xl text-yellow-300"><PartlyCloudy /></el-icon> -->
              <img class="w-1/4" :src="`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`" alt="">
              <div class="flex items-start">
                <span class="text-6xl font-light">{{ Math.round(current.temp) }}</span>
                <span class="text-2xl mt-1">°C</span>
              </div>
              <div class="ml-4">
                <div class="text-xl">{{ current.weather[0].description }}</div>
                <div class="text-gray-300">
                  Feels like {{ Math.round(current.feels_like) }}°
                </div>
              </div>
            </div>

            <!-- Forecast message -->
            <div class="text-gray-300 mb-6">
              Expect partly sunny skies. The high will be {{ Math.round(current.temp) }}°.
            </div>

            <!-- Weather metrics grid -->
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              <!-- Wind -->
              <div class="flex items-center gap-2">
                <el-icon class="text-xl"><WindPower /></el-icon>
                <div>
                  <div class="text-sm text-gray-300">Wind</div>
                  <div>{{ current.wind_speed }} km/h ↓</div>
                </div>
              </div>

              <!-- Humidity -->
              <div class="flex items-center gap-2">
                <el-icon class="text-xl"><Watermelon /></el-icon>
                <div>
                  <div class="text-sm text-gray-300">Humidity</div>
                  <div>{{ current.humidity }}%</div>
                </div>
              </div>

              <!-- Visibility -->
              <div class="flex items-center gap-2">
                <el-icon class="text-xl"><ZoomIn /></el-icon>
                <div>
                  <div class="text-sm text-gray-300">Visibility</div>
                  <div>{{ current.visibility / 1000 }} km</div>
                </div>
              </div>

              <!-- Pressure -->
              <div class="flex items-center gap-2">
                <el-icon class="text-xl"><Watch /></el-icon>
                <div>
                  <div class="text-sm text-gray-300">Pressure</div>
                  <div>{{ current.pressure }} mb</div>
                </div>
              </div>

              <!-- Dew point -->
              <div class="flex items-center gap-2">
                <el-icon class="text-xl"><Sunny /></el-icon>
                <div>
                  <div class="text-sm text-gray-300">Dew point</div>
                  <div>{{ current.dew_point }}°</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Почасовой прогноз">
          <div v-if="hourly" class="bg-[#2B4465] text-white p-6 rounded-lg">
            <div v-for="hour in hourly" :key="hour.dt" class="mb-4">
              <div class="text-xl">{{ new Date(hour.dt * 1000).toLocaleTimeString() }}</div>
              <div>Температура: {{ hour.temp }}°C</div>
              <div>Ощущается как: {{ hour.feels_like }}°C</div>
              <div>Влажность: {{ hour.humidity }}%</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Дневной прогноз">
          <div v-if="daily" class="bg-[#2B4465] text-white p-6 rounded-lg">
            <div v-for="day in daily" :key="day.dt" class="mb-4">
              <div class="text-xl">{{ new Date(day.dt * 1000).toLocaleDateString() }}</div>
              <div>Температура: {{ day.temp.day }}°C</div>
              <div>Минимальная температура: {{ day.temp.min }}°C</div>
              <div>Максимальная температура: {{ day.temp.max }}°C</div>
              <div>Влажность: {{ day.humidity }}%</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
