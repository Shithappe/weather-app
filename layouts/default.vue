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
        <h1
          class="text-xl text-sky-500">Weather App</h1>

        <!-- Settings Dropdown -->
        <el-dropdown trigger="click" @command="handleCommand">
          <el-icon :size="25" class="hover:cursor-pointer shadow-lg"><Setting /></el-icon>

          <template #dropdown>
            <el-dropdown-menu>
              <!-- Theme Toggle -->
              <el-dropdown-item command="toggleTheme">
                <div class="flex items-center">
                  <el-icon class="mr-2">
                    <Moon v-if="isDark" />
                    <Sunny v-else />
                  </el-icon>
                  {{ isDark ? 'Светлая тема' : 'Темная тема' }}
                </div>
              </el-dropdown-item>

              <!-- Temperature Unit Toggle -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- Main Content -->
    <el-main class="max-w-7xl mx-auto">
      <slot />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { Setting, Moon, Sunny } from '@element-plus/icons-vue'

const isDark = ref(true)

// Используем useHead для управления классом dark
useHead({
  htmlAttrs: {
    class: computed(() => isDark.value ? 'dark' : '')
  }
})

// Загрузка настроек
onMounted(() => {
  if (process.client) {
    const savedSettings = localStorage.getItem('weatherAppSettings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      isDark.value = settings.isDark
    }
  }
})

// Сохранение настроек
watchEffect(() => {
  if (process.client) {
    localStorage.setItem('weatherAppSettings', 
      JSON.stringify({ isDark: isDark.value})
    )
  }
})

const handleCommand = (command) => {
  switch (command) {
    case 'toggleTheme':
      isDark.value = !isDark.value
      break
    case 'toggleUnit':
      isCelsius.value = !isCelsius.value
      break
  }
}

// Provide settings
provide('weatherSettings', {
  isDark,
})
</script>
