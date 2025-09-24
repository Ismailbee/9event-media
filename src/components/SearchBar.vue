<template>
  <div class="relative max-w-md mx-auto">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    <input
      v-model="searchQuery"
      @input="handleSearch"
      type="text"
      placeholder="Search news articles..."
      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    />
    <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
      <button
        @click="clearSearch"
        class="text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from '../stores/news'

export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      const newsStore = useNewsStore()
      newsStore.searchArticles(this.searchQuery)
    },
    clearSearch() {
      this.searchQuery = ''
      this.handleSearch()
    }
  }
}
</script>