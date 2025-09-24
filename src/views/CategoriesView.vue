<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="bg-indigo-600 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            All Categories
          </h1>
          <p class="text-xl text-indigo-100">
            Browse news by category or search for specific topics
          </p>
        </div>
      </div>
    </section>

    <!-- News Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Category Overview -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Categories Overview</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectCategory(category)"
              :class="[
                'p-4 rounded-lg border-2 text-center transition-all duration-200',
                selectedCategory === category
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
              ]"
            >
              <div class="text-2xl mb-2">📰</div>
              <h3 class="font-medium text-sm">{{ category }}</h3>
              <p class="text-xs text-gray-500 mt-1">
                {{ getCategoryCount(category) }}
              </p>
            </button>
          </div>
        </div>

        <!-- News Grid with full functionality -->
        <NewsGrid />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/newsStore'
import NewsGrid from '@/components/NewsGrid.vue'

const route = useRoute()
const newsStore = useNewsStore()
const { categories, articles, selectedCategory, setCategory } = newsStore

// Check for category parameter in URL
onMounted(() => {
  const categoryParam = route.query.category as string
  if (categoryParam) {
    setCategory(categoryParam)
  }
})

function getCategoryCount(category: string): number {
  return articles.filter(article => article.category === category).length
}

function selectCategory(category: string) {
  if (selectedCategory === category) {
    // If clicking the same category, clear the filter
    newsStore.clearFilters()
  } else {
    setCategory(category)
  }
}
</script>