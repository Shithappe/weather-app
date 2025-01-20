<script setup>
import { computed } from 'vue';

const props = defineProps(['daily'])

const isDarkTheme = computed(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};
</script>

<template>
  <el-carousel 
    height="300px" 
    arrow="always" 
    indicator-position="outside" 
    class="w-full"
  >
    <el-carousel-item 
      v-for="day in daily" 
      :key="day.dt"
    >
      <el-card 
        class="p-4 shadow-md rounded-lg h-full flex flex-col justify-between"
        :class="{ 'bg-gray-800 text-gray-200': isDarkTheme, 'bg-gray-50 text-gray-800': !isDarkTheme }"
      >
        <template #header>
          <div class="h-min flex justify-between items-center">
            <div class="flex items-center gap-x-4">
              <div class="text-lg font-semibold capitalize">
              {{ new Date(day.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'long' }) }} 
            </div>
            <span>{{ day.temp.min }}°C / {{ day.temp.max }}°C</span>
            </div>
            <div>{{ new Date(day.dt * 1000).toLocaleDateString() }}</div>
          </div>
        </template>
        
        <div class="flex items-center mb-4">
          <img 
            class="image-container"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" 
            :alt="day.weather[0].description" 
          />
          <div class="flex items-start">
            <span class="text-6xl font-light">{{ Math.round(day.temp.day) }}</span>
            <span class="text-2xl mt-1 ml-1">°C</span>
          </div>
          <div class="text-lg font-medium ml-1 pt-6">{{ day.weather[0].description }}</div>

          
        </div>
        
        
        <div class="flex gap-4 text-sm mb-4">
          <span class="block">
            <span class="font-semibold">Утром:</span> {{ day.temp.morn || "N/A" }}°C
          </span>
          <span class="block">
            <span class="font-semibold">Днем:</span> {{ day.temp.day || "N/A" }}°C
          </span>
          <span class="block">
            <span class="font-semibold">Вечером:</span> {{ day.temp.eve || "N/A" }}°C
          </span>
          <span class="block">
            <span class="font-semibold">Ночью:</span> {{ day.temp.night || "N/A" }}°C
          </span>
        </div>

        <div class="flex items-center gap-x-2 mb-4">
          <el-tag 
            type="info" 
            size="default"
            class="text-sm"
          >
            Влажность: {{ day.humidity }}%
          </el-tag>
          <el-tag 
            type="info" 
            size="default"
            class="text-sm"
          >
            Давление: {{ day.pressure }}hPa
          </el-tag>
          <el-tag 
            type="info" 
            size="default"
            class="text-sm"
          >
            Светодень: {{ formatTime(day.sunrise) }} - {{formatTime(day.sunset) }}
          </el-tag>
        </div>
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>
