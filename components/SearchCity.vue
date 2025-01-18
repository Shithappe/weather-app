<script setup>
import { ref } from 'vue'
import { Location } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchQuery = ref('')
const selectedLocation = ref(null)

// Функция поиска городов через Nominatim API
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
    callback(data)
  } catch (error) {
    console.error('Ошибка при поиске городов:', error)
    ElMessage.error('Ошибка при поиске городов')
    callback([])
  }
}

// Функция выбора города из результатов
function handleSelect(city) {
  selectedLocation.value = {
    display_name: city.display_name,
    lat: city.lat,
    lon: city.lon
  }
}

// Функция получения текущих координат
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
  <div class="w-full">
    <el-autocomplete
      v-model="searchQuery"
      :fetch-suggestions="searchCities"
      :trigger-on-focus="false"
      placeholder="Введите название города"
      clearable
      class="w-full"
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
      class="mt-2 w-full"
    >
      <template #icon>
        <el-icon><Location /></el-icon>
      </template>
      Определить моё местоположение
    </el-button>

    <!-- Выбранное местоположение -->
    <el-card v-if="selectedLocation" class="mt-4">
      <template #header>
        <div class="font-bold">Выбранное местоположение</div>
      </template>
      <p class="mb-2">{{ selectedLocation.display_name }}</p>
      <el-tag type="info" class="w-full text-center">
        Координаты: {{ selectedLocation.lat }}, {{ selectedLocation.lon }}
      </el-tag>
    </el-card>
  </div>
</template>