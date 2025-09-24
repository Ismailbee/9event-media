<template>
  <div class="space-y-6">
    <!-- Search and Filter Section -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1">
          <input
            type="text"
            v-model="localSearchQuery"
            placeholder="Search news..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @input="handleSearch"
          />
        </div>
        
        <!-- Category Filter -->
        <div class="md:w-48">
          <select
            v-model="localSelectedCategory"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @change="handleCategoryChange"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        
        <!-- Clear Filters Button -->
        <button
          v-if="localSearchQuery || localSelectedCategory"
          @click="clearFilters"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Results Info -->
    <div class="text-gray-600">
      <p>
        Showing {{ paginatedArticles.length }} of {{ filteredArticles.length }} articles
        <span v-if="localSearchQuery || localSelectedCategory" class="font-medium">
          (filtered)
        </span>
      </p>
    </div>

    <!-- News Grid -->
    <div v-if="paginatedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NewsCard
        v-for="article in paginatedArticles"
        :key="article.id"
        :article="article"
        @read-more="handleReadMore"
      />
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-12">
      <div class="text-gray-500 text-lg">
        <p>No articles found</p>
        <p class="text-sm mt-2">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
      >
        Previous
      </button>
      
      <div class="flex space-x-2">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-4 py-2 rounded-lg transition-colors duration-200',
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import NewsCard from './NewsCard.vue'

const newsStore = useNewsStore()

// Local reactive variables for immediate UI updates
const localSearchQuery = ref(newsStore.searchQuery)
const localSelectedCategory = ref(newsStore.selectedCategory)

// Computed properties from store
const { paginatedArticles, filteredArticles, totalPages, currentPage, categories } = newsStore

// Pagination computed
const visiblePages = computed(() => {
  const pages = []
  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, startPage + 4)
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

// Watch for changes from store and update local values
watch(() => newsStore.searchQuery, (newValue) => {
  localSearchQuery.value = newValue
})

watch(() => newsStore.selectedCategory, (newValue) => {
  localSelectedCategory.value = newValue
})

// Methods
function handleSearch() {
  newsStore.setSearchQuery(localSearchQuery.value)
}

function handleCategoryChange() {
  newsStore.setCategory(localSelectedCategory.value)
}

function clearFilters() {
  localSearchQuery.value = ''
  localSelectedCategory.value = ''
  newsStore.clearFilters()
}

function handleReadMore(articleId: number) {
  // Emit event to parent or navigate to article detail
  console.log('Read more article:', articleId)
  // In a real app, you would navigate to the article detail page
  // For now, just scroll to top to simulate navigation
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPage(page: number) {
  newsStore.setPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPreviousPage() {
  if (currentPage > 1) {
    newsStore.setPage(currentPage - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function goToNextPage() {
  if (currentPage < totalPages) {
    newsStore.setPage(currentPage + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>