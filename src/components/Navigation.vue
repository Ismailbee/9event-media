<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
              9E
            </div>
            <span class="text-xl font-bold text-gray-900">9Event Media</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            :class="linkClass('/')"
          >
            Home
          </router-link>
          <router-link
            to="/nigeria"
            :class="linkClass('/nigeria')"
          >
            Nigeria News
          </router-link>
          <router-link
            to="/international"
            :class="linkClass('/international')"
          >
            International
          </router-link>
          <div class="relative" ref="dropdown">
            <button
              @click="toggleDropdown"
              class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <span>Categories</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            >
              <router-link
                v-for="category in availableCategories"
                :key="category"
                :to="`/category/${category}`"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                @click="closeDropdown"
              >
                {{ category }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-blue-600 p-2"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden bg-white border-t">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            :class="mobileLinkClass('/')"
            @click="closeMobileMenu"
          >
            Home
          </router-link>
          <router-link
            to="/nigeria"
            :class="mobileLinkClass('/nigeria')"
            @click="closeMobileMenu"
          >
            Nigeria News
          </router-link>
          <router-link
            to="/international"
            :class="mobileLinkClass('/international')"
            @click="closeMobileMenu"
          >
            International
          </router-link>
          <div class="pl-4 space-y-1">
            <div class="text-sm font-medium text-gray-500 px-3 py-2">Categories</div>
            <router-link
              v-for="category in availableCategories"
              :key="category"
              :to="`/category/${category}`"
              class="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
              @click="closeMobileMenu"
            >
              {{ category }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useNewsStore } from '../stores/news'

export default {
  name: 'Navigation',
  data() {
    return {
      showDropdown: false,
      showMobileMenu: false
    }
  },
  computed: {
    availableCategories() {
      const newsStore = useNewsStore()
      return newsStore.categories.filter(cat => cat !== 'all')
    }
  },
  methods: {
    linkClass(path) {
      const isActive = this.$route.path === path
      return isActive
        ? 'text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium'
        : 'text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
    },
    mobileLinkClass(path) {
      const isActive = this.$route.path === path
      return isActive
        ? 'bg-blue-50 text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    closeDropdown() {
      this.showDropdown = false
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    closeMobileMenu() {
      this.showMobileMenu = false
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(e.target)) {
        this.showDropdown = false
      }
    })
  }
}
</script>