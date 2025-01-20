<script setup>
import { ref } from 'vue'


const selectedLocation = ref(null)

// Обработчик события locationSelected
function handleLocationSelected(location) {
  selectedLocation.value = location
  console.log('Selected Location:', selectedLocation.value)
}
</script>

<template>
  <div>
    <SearchCity @locationSelected="handleLocationSelected" />
    <Weather v-if="selectedLocation" :location="selectedLocation" />
  </div>
</template>
