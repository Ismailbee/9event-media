<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-purple-600 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-4 capitalize">
            {{ category }} News
          </h1>
          <p class="text-lg md:text-xl opacity-90">
            Latest {{ category }} news and updates
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
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>

        <!-- News Grid -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900 capitalize">
              {{ category }} Articles
            </h2>
            <span class="text-gray-600">
              {{ filteredCategoryNews.length }} articles
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              No {{ category }} articles found.
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
  name: 'CategoryPage',
  components: {
    NewsCard,
    SearchBar,
    Pagination
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  computed: {
    loading() {
      const newsStore = useNewsStore()
      return newsStore.loading
    },
    categoryNews() {
      const newsStore = useNewsStore()
      return newsStore.articles.filter(article => article.category === this.category)
    },
    filteredCategoryNews() {
      const newsStore = useNewsStore()
      let filtered = this.categoryNews
      
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
      return this.filteredCategoryNews.slice(startIndex, endIndex)
    }
  },
  async created() {
    const newsStore = useNewsStore()
    if (newsStore.articles.length === 0) {
      await newsStore.loadArticles()
    }
    // Set filter to show category news
    newsStore.filterByCategory(this.category)
  },
  async beforeRouteUpdate(to, from, next) {
    const newsStore = useNewsStore()
    newsStore.filterByCategory(to.params.category)
    next()
  },
  beforeUnmount() {
    const newsStore = useNewsStore()
    // Reset to all news when leaving
    newsStore.filterByCategory('all')
  }
}
</script>