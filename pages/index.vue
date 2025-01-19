<script setup>
import { ref } from 'vue'
import SearchCity from '~/components/SearchCity.vue'
import Weather from '~/components/Weather.vue'

const selectedLocation = ref(null)

// Обработчик события locationSelected
function handleLocationSelected(location) {
  selectedLocation.value = location
  console.log('Selected Location:', selectedLocation.value)
}
</script>

<template>
  <div>
    <pre>{{ selectedLocation }}</pre>
    <SearchCity @locationSelected="handleLocationSelected" />
    <Weather v-if="selectedLocation" :location="selectedLocation" />
  </div>
</template>