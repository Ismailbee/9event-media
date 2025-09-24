<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-green-600 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            Nigeria News
          </h1>
          <p class="text-lg md:text-xl opacity-90">
            Latest news and updates from Nigeria
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search Bar -->
        <div class="mb-8 flex justify-center">
          <SearchBar />
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>

        <!-- News Grid -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              Nigeria News Articles
            </h2>
            <span class="text-gray-600">
              {{ filteredNigeriaNews.length }} articles
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              No Nigeria news articles found.
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
import Pagination from '../components/Pagination.vue'

export default {
  name: 'NigeriaNews',
  components: {
    NewsCard,
    SearchBar,
    Pagination
  },
  computed: {
    loading() {
      const newsStore = useNewsStore()
      return newsStore.loading
    },
    nigeriaNews() {
      const newsStore = useNewsStore()
      return newsStore.nigeriaNews
    },
    filteredNigeriaNews() {
      const newsStore = useNewsStore()
      let filtered = this.nigeriaNews
      
      if (newsStore.searchQuery) {
        const query = newsStore.searchQuery.toLowerCase()
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query)
        )
      }
      
      return filtered
    },
    paginatedArticles() {
      const newsStore = useNewsStore()
      const startIndex = (newsStore.currentPage - 1) * newsStore.articlesPerPage
      const endIndex = startIndex + newsStore.articlesPerPage
      return this.filteredNigeriaNews.slice(startIndex, endIndex)
    }
  },
  async created() {
    const newsStore = useNewsStore()
    if (newsStore.articles.length === 0) {
      await newsStore.loadArticles()
    }
    // Set filter to show Nigeria news
    newsStore.filterByCategory('nigeria')
  },
  beforeUnmount() {
    const newsStore = useNewsStore()
    // Reset to all news when leaving
    newsStore.filterByCategory('all')
  }
}
</script>