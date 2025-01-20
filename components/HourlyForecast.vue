<script setup>
import { defineProps } from 'vue'

const props = defineProps(['hourly'])
</script>

<!-- <template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="hour in hourly" :key="hour.dt" class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex items-center justify-between">
        <div class="text-lg font-medium">{{ new Date(hour.dt * 1000).toLocaleTimeString() }}</div>
        <img :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`" alt="Weather Icon" class="w-12 h-12">
      </div>
      <div class="text-4xl font-bold mt-2">{{ Math.round(hour.temp) }}°C</div>
      <div class="text-gray-600 mt-1">Ощущается как {{ Math.round(hour.feels_like) }}°C</div>
      <div class="text-gray-600 mt-1">Влажность: {{ hour.humidity }}%</div>
      <div class="text-gray-600 mt-1">Ветер: {{ hour.wind_speed }} km/h</div>
      <div class="text-gray-600 mt-1">{{ hour.weather[0].description }}</div>
    </div>
  </div>
</template> -->
<template>
  <div class="space-y-4">
    <el-card v-for="hour in hourly" :key="hour.dt" class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex items-center justify-between">
        <div class="text-lg font-medium">{{ new Date(hour.dt * 1000).toLocaleTimeString() }}</div>
        <img :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`" alt="Weather Icon" class="w-12 h-12">
      </div>
      <div class="text-4xl font-bold mt-2">{{ Math.round(hour.temp) }}°C</div>
      <div class="text-gray-600 mt-1">Ощущается как {{ Math.round(hour.feels_like) }}°C</div>
      <div class="text-gray-600 mt-1">Влажность: {{ hour.humidity }}%</div>
      <div class="text-gray-600 mt-1">Ветер: {{ hour.wind_speed }} km/h</div>
      <div class="text-gray-600 mt-1">{{ hour.weather[0].description }}</div>
    </el-card>
  </div>
</template>


