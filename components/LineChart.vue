<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps(['data'])

console.log('props.data:', props.data);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Температура',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: []
    },
    {
      label: 'Ощущается как',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      data: []
    },
    {
      label: 'Влажность',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      data: []
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

watch(
  () => props.data,
  (newData) => {
    chartData.value.labels = newData.map(item => item.time)
    chartData.value.datasets[0].data = newData.map(item => item.temp)
    chartData.value.datasets[1].data = newData.map(item => item.feels_like)
    chartData.value.datasets[2].data = newData.map(item => item.humidity)
  },
  { immediate: true }
)
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>
