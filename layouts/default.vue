<!-- layouts/default.vue -->
<template>
  <el-container class="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
    <!-- Header -->
    <el-header class="border-b bg-white dark:bg-gray-900 shadow-sm">
      <div class="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <h1 class="text-xl text-gray-800 dark:text-white">Weather App</h1>

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
              <el-dropdown-item command="toggleUnit">
                <div class="flex items-center">
                  <el-icon class="mr-2"><Celsius /></el-icon>
                  {{ isCelsius ? '°F Фаренгейт' : '°C Цельсий' }}
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- Main Content -->
    <el-main class="max-w-7xl mx-auto px-4 py-6">
      <slot />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { Setting, Moon, Sunny } from '@element-plus/icons-vue'

// Создаем иконку для температуры
const Celsius = defineComponent({
  name: 'Celsius',
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      width: '1em',
      height: '1em',
      fill: 'currentColor'
    }, [
      h('path', {
        d: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10-4h-4v2h4v-2zM2 10h4v2H2v-2z'
      })
    ])
  }
})

const isDark = ref(true)
const isCelsius = ref(true)

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
      isCelsius.value = settings.isCelsius
    }
  }
})

// Сохранение настроек
watchEffect(() => {
  if (process.client) {
    localStorage.setItem('weatherAppSettings', 
      JSON.stringify({ isDark: isDark.value, isCelsius: isCelsius.value })
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
  isCelsius
})
</script>

<style>
:root {
  --el-color-primary: #409eff;
}

html.dark {
  color-scheme: dark;
  --el-bg-color: #1a1a1a;
  --el-text-color-primary: #ffffff;
  --el-text-color-regular: #e5eaf3;
  --el-border-color: #373737;
  --el-border-color-light: #373737;
}

.dark .el-dropdown-menu {
  --el-bg-color: #1a1a1a;
  --el-text-color-regular: #e5eaf3;
}

.el-dropdown-menu__item:not(.is-disabled):focus {
  background-color: var(--el-color-primary-light-9);
}
</style>