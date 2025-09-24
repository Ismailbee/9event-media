<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            Stay Informed with 9Event Media
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Your trusted source for Nigeria and international news
          </p>
          <SearchBar />
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Category Filter -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Browse by Category</h2>
          <CategoryFilter />
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- News Grid -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">
              Latest News 
              <span v-if="selectedCategory !== 'all'" class="text-blue-600 capitalize">
                · {{ selectedCategory }}
              </span>
            </h3>
            <span class="text-gray-600">
              {{ filteredArticles.length }} articles found
            </span>
          </div>

          <div v-if="paginatedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsCard
              v-for="article in paginatedArticles"
              :key="article.id"
              :article="article"
            />
          </div>

          <div v-else class="text-center py-12">
            <div class="text-gray-500 text-lg">
              <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              No articles found matching your criteria.
            </div>
          </div>

          <!-- Pagination -->
          <Pagination />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useNewsStore } from '../stores/news'
import NewsCard from '../components/NewsCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'Home',
  components: {
    NewsCard,
    SearchBar,
    CategoryFilter,
    Pagination
  },
  computed: {
    loading() {
      const newsStore = useNewsStore()
      return newsStore.loading
    },
    paginatedArticles() {
      const newsStore = useNewsStore()
      return newsStore.paginatedArticles
    },
    filteredArticles() {
      const newsStore = useNewsStore()
      return newsStore.filteredArticles
    },
    selectedCategory() {
      const newsStore = useNewsStore()
      return newsStore.selectedCategory
    }
  },
  async created() {
    const newsStore = useNewsStore()
    await newsStore.loadArticles()
  }
}
</script>