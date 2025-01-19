<template>
  <el-container
    class="min-h-screen transition-colors duration-300"
    :class="isDark ? 'bg-gray-800' : 'bg-gray-100'"
  >
    <!-- Header -->
    <el-header
      class="border-b shadow-sm transition-colors duration-300"
      :class="isDark ? 'bg-gray-900' : 'bg-white'"
    >
      <div class="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <h1 class="text-xl text-sky-500">Weather App</h1>

        <div class="flex items-center gap-4">
          <!-- Theme Toggle Button -->
          <el-button
            :icon="isDark ? Moon : Sunny"
            circle
            @click="toggleTheme"
          />

          <!-- Settings Button -->
          <el-button
            :icon="Setting"
            circle
            @click="drawer = true"
          />
        </div>
      </div>
    </el-header>

    <!-- Main Content -->
    <div class="flex justify-center">
      <el-main class="max-w-2xl">
        <slot />
      </el-main>
  </div>

    <!-- Settings Drawer -->
    <el-drawer
      v-model="drawer"
      title="Настройки"
      direction="rtl"
      size="300px"
    >
      <div class="p-4">
        <!-- Temperature Units -->
        <div class="mb-6">
          <h3 class="text-lg mb-3">Единицы измерения</h3>
          <el-radio-group v-model="settings.unit" @change="saveSettings">
            <el-radio value="C">Цельсий °C</el-radio>
            <el-radio value="F">Фаренгейт °F</el-radio>
          </el-radio-group>
        </div>

        <!-- Saved Cities -->
        <el-collapse v-model="activeCollapse">
          <el-collapse-item title="Сохраненные города" name="saved-cities">
            <template v-if="settings.savedCities.length">
              <div
                v-for="city in settings.savedCities"
                :key="city"
                class="flex items-center justify-between py-2"
              >
                <span>{{ city.display_name.split(',')[0] }}</span>
                <el-button
                  type="danger"
                  size="small"
                  circle
                  @click="removeCity(city)"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </template>
            <template v-else>
              <p class="text-gray-500">Нет сохраненных городов</p>
            </template>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>
  </el-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Setting, Moon, Sunny, Delete } from '@element-plus/icons-vue'

// State
const drawer = ref(false)
const isDark = ref(true)
const activeCollapse = ref(['saved-cities'])

// Settings
const settings = reactive({
  unit: 'C',
  savedCities: []
})

// Load settings from localStorage
onMounted(() => {
  if (process.client) {
    const savedSettings = localStorage.getItem('weatherAppSettings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      isDark.value = parsed.isDark
      settings.unit = parsed.unit || 'C'
      settings.savedCities = parsed.savedCities || []
    }
  }
})

// Save settings to localStorage
const saveSettings = () => {
  if (process.client) {
    localStorage.setItem('weatherAppSettings', JSON.stringify({
      isDark: isDark.value,
      unit: settings.unit,
      savedCities: settings.savedCities
    }))
  }
}

// Theme toggle
const toggleTheme = () => {
  isDark.value = !isDark.value
  saveSettings()
}

// Remove city
const removeCity = (city) => {
  settings.savedCities = settings.savedCities.filter(c => c !== city)
  saveSettings()
}

// Watch for theme changes
useHead({
  htmlAttrs: {
    class: computed(() => isDark.value ? 'dark' : '')
  }
})

// Provide settings
provide('weatherSettings', {
  isDark,
  settings
})
</script>