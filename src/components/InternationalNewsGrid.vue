<template>
  <div class="space-y-6">
    <!-- Search Section -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1">
          <input
            type="text"
            v-model="localSearchQuery"
            placeholder="Search international news..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            @input="handleSearch"
          />
        </div>
        
        <!-- Clear Search Button -->
        <button
          v-if="localSearchQuery"
          @click="clearSearch"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          Clear Search
        </button>
      </div>
    </div>

    <!-- Results Info -->
    <div class="text-gray-600">
      <p>
        Showing {{ displayedArticles.length }} international news articles
        <span v-if="localSearchQuery" class="font-medium">
          (search results)
        </span>
      </p>
    </div>

    <!-- News Grid -->
    <div v-if="displayedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NewsCard
        v-for="article in displayedArticles"
        :key="article.id"
        :article="article"
        @read-more="handleReadMore"
      />
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-12">
      <div class="text-gray-500 text-lg">
        <p>No international news articles found</p>
        <p class="text-sm mt-2">Try adjusting your search</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import NewsCard from './NewsCard.vue'

const newsStore = useNewsStore()
const localSearchQuery = ref('')

const displayedArticles = computed(() => {
  let articles = newsStore.internationalNews
  
  if (localSearchQuery.value) {
    articles = articles.filter(article =>
      article.title.toLowerCase().includes(localSearchQuery.value.toLowerCase()) ||
      article.description.toLowerCase().includes(localSearchQuery.value.toLowerCase())
    )
  }
  
  return articles
})

function handleSearch() {
  // Search is handled by the computed property
}

function clearSearch() {
  localSearchQuery.value = ''
}

function handleReadMore(articleId: number) {
  console.log('Read more article:', articleId)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>