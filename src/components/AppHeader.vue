<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-800">
            9Event Media
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            to="/"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/' }"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/nigeria"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/nigeria' }"
          >
            Nigeria News
          </RouterLink>
          <RouterLink
            to="/international"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/international' }"
          >
            International
          </RouterLink>
          <RouterLink
            to="/categories"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/categories' }"
          >
            Categories
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 space-y-2">
        <RouterLink
          to="/"
          @click="closeMobileMenu"
          class="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          :class="{ 'text-blue-600 bg-blue-50 font-semibold': $route.path === '/' }"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/nigeria"
          @click="closeMobileMenu"
          class="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          :class="{ 'text-blue-600 bg-blue-50 font-semibold': $route.path === '/nigeria' }"
        >
          Nigeria News
        </RouterLink>
        <RouterLink
          to="/international"
          @click="closeMobileMenu"
          class="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          :class="{ 'text-blue-600 bg-blue-50 font-semibold': $route.path === '/international' }"
        >
          International
        </RouterLink>
        <RouterLink
          to="/categories"
          @click="closeMobileMenu"
          class="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          :class="{ 'text-blue-600 bg-blue-50 font-semibold': $route.path === '/categories' }"
        >
          Categories
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>