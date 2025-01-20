<script setup>
import { ref, onMounted } from 'vue'
import { Location, Position, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['locationSelected'])

const searchQuery = ref('')
const selectedLocation = ref(null)
const savedCities = ref([])
const settings = ref({
  isDark: false,
  unit: 'C',
  savedCities: []
})

onMounted(() => {
  if (process.client) {
    const savedSettings = localStorage.getItem('weatherAppSettings')
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      settings.value.isDark = parsedSettings.isDark || settings.value.isDark
      settings.value.unit = parsedSettings.unit || settings.value.unit
      savedCities.value = parsedSettings.savedCities || []
    }
  }
})

function toggleFavorite(city) {
  const cityIndex = savedCities.value.findIndex(
    saved => saved.lat === city.lat && saved.lon === city.lon
  )
  
  if (cityIndex === -1) {
    savedCities.value.push(city)
    ElMessage.success('Город добавлен в избранное')
  } else {
    savedCities.value.splice(cityIndex, 1)
    ElMessage.success('Город удален из избранного')
  }
  
  settings.value.savedCities = savedCities.value
  localStorage.setItem('weatherAppSettings', JSON.stringify(settings.value))
}

function isCityFavorite(city) {
  return savedCities.value.some(
    saved => saved.lat === city.lat && saved.lon === city.lon
  )
}

function selectSavedCity(city) {
  selectedLocation.value = city
  searchQuery.value = city.display_name
  emit('locationSelected', city)
}

async function searchCities(query, callback) {
  if (query.length < 3) {
    callback([])
    return
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    )
    const data = await response.json()
    if (!Array.isArray(data)) {
      console.error('Некорректный формат данных:', data)
      callback([])
      return
    }
    callback(data)
  } catch (error) {
    console.error('Ошибка при поиске городов:', error)
    ElMessage.error('Ошибка при поиске городов')
    callback([])
  }
}

function handleSelect(city) {
  selectedLocation.value = {
    display_name: city.display_name,
    lat: city.lat,
    lon: city.lon
  }
  emit('locationSelected', city)
}

function getCurrentLocation() {
  if (!navigator.geolocation) {
    ElMessage.warning('Геолокация не поддерживается вашим браузером')
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
        const data = await response.json()

        selectedLocation.value = {
          display_name: data.display_name,
          lat: latitude,
          lon: longitude
        }
        searchQuery.value = data.display_name
        ElMessage.success('Местоположение определено успешно')
        emit('locationSelected', selectedLocation.value)
      } catch (error) {
        console.error('Ошибка при получении информации о местоположении:', error)
        ElMessage.error('Ошибка при получении информации о местоположении')
      }
    },
    (error) => {
      console.error('Ошибка при получении координат:', error)
      ElMessage.error('Не удалось получить ваше местоположение')
    }
  )
}
</script>

<template>
  <div class="w-full mb-4">
    <div class="flex items-center space-x-4">
      <el-autocomplete
        :model-value="searchQuery"
        @update:modelValue="searchQuery = $event"
        :fetch-suggestions="searchCities"
        :trigger-on-focus="false"
        placeholder="Введите название города"
        clearable
        class="flex-grow"
        :debounce="300"
        @select="handleSelect"
      >
        <template #default="{ item }">
          <div class="flex flex-col">
            <span class="text-sm">{{ item.display_name }}</span>
            <span class="text-xs text-gray-500">
              {{ item.lat }}, {{ item.lon }}
            </span>
          </div>
        </template>
      </el-autocomplete>

      <el-button
        type="primary"
        @click="getCurrentLocation"
        class="flex-shrink-0"
      >
        <template #icon>
          <el-icon><Position /></el-icon>
        </template>
      </el-button>
    </div>

    <div v-if="savedCities.length > 0" class="mt-4">
      <div class="flex">
        <el-button
          v-for="city in savedCities"
          :key="city.display_name"
          class="w-min cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectSavedCity(city)"
        >
          <div class="flex items-center justify-between">
            <p class="text-sm">{{ city.display_name.split(',')[0] }}</p>
          </div>
        </el-button>
      </div>
    </div>

    <el-card v-if="selectedLocation" class="mt-4" shadow="hover">
      <div class="flex items-center justify-between">
        <p class="flex-grow">{{ selectedLocation.display_name }}</p>
        <el-icon
          class="text-2xl ml-2 cursor-pointer"
          color="#409EFF"
          @click="toggleFavorite(selectedLocation)"
        >
          <component :is="isCityFavorite(selectedLocation) ? StarFilled : Star" />
        </el-icon>
      </div>
      <el-tag type="info" class="w-full text-center">
        Координаты: {{ selectedLocation.lat }}, {{ selectedLocation.lon }}
      </el-tag>
    </el-card>
  </div>
</template>
