<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-blue-600 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            International News
          </h1>
          <p class="text-lg md:text-xl opacity-90">
            Global news and worldwide updates
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
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- News Grid -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              International News Articles
            </h2>
            <span class="text-gray-600">
              {{ filteredInternationalNews.length }} articles
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              No international news articles found.
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
  name: 'InternationalNews',
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
    internationalNews() {
      const newsStore = useNewsStore()
      return newsStore.internationalNews
    },
    filteredInternationalNews() {
      const newsStore = useNewsStore()
      let filtered = this.internationalNews
      
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
      return this.filteredInternationalNews.slice(startIndex, endIndex)
    }
  },
  async created() {
    const newsStore = useNewsStore()
    if (newsStore.articles.length === 0) {
      await newsStore.loadArticles()
    }
    // Set filter to show international news
    newsStore.filterByCategory('international')
  },
  beforeUnmount() {
    const newsStore = useNewsStore()
    // Reset to all news when leaving
    newsStore.filterByCategory('all')
  }
}
</script>