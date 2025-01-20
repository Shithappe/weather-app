<script setup>
const props = defineProps(['current'])
</script>

<template>
  <el-card v-if="props.current">
    <!-- Main temperature display -->
    <div class="flex items-center">
      <img class="image-container" :src="`https://openweathermap.org/img/wn/${props.current.weather[0].icon}@4x.png`" alt="">
      <div class="flex items-start">
        <span class="text-6xl font-light">{{ Math.round(props.current.temp) }}</span>
        <span class="text-2xl mt-1 ml-1">°C</span>
      </div>
      <div class="ml-4">
        <div class="text-xl">{{ props.current.weather[0].description }}</div>
        <div class="text-gray-300">Ощущается как {{ Math.round(props.current.feels_like) }}°
        </div>
      </div>
    </div>

    <!-- Forecast message -->
    <div class="text-gray-300 mb-6">
      <WeatherSummary :current="props.current" />
    </div>

    <!-- Weather metrics grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <!-- Wind -->
      <div class="flex items-center gap-2">
        <div>
          <div class="text-sm text-gray-300">Ветер</div>
          <div>{{ props.current.wind_speed }} km/h</div>
        </div>
      </div>

      <!-- Humidity -->
      <div class="flex items-center gap-2">
        <div>
          <div class="text-sm text-gray-300">Влажность</div>
          <div>{{ props.current.humidity }}%</div>
        </div>
      </div>

      <!-- Visibility -->
      <div class="flex items-center gap-2">
        <div>
          <div class="text-sm text-gray-300">Видимость</div>
          <div>{{ props.current.visibility / 1000 }} km</div>
        </div>
      </div>

      <!-- Pressure -->
      <div class="flex items-center gap-2">
        <div>
          <div class="text-sm text-gray-300">Давление</div>
          <div>{{ props.current.pressure }} mb</div>
        </div>
      </div>

      <!-- Dew point -->
      <div class="flex items-center gap-2">
        <div>
          <div class="text-sm text-gray-300">Точка росы</div>
          <div>{{ props.current.dew_point }}°</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style>
.image-container {
  width: 100px; /* Ширина контейнера */
  height: 100px; /* Высота контейнера */
  overflow: hidden; /* Скрыть выходящие за границы части изображения */
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: auto; /* Удерживать пропорции ширины */
  height: 100%; /* Подогнать по высоте */
  object-fit: cover; /* Обрезать изображение, чтобы заполнить контейнер */
  object-position: center; /* Центрировать изображение */
}
</style>
