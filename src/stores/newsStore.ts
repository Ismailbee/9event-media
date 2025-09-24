import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import newsData from '@/data/newsData.json'

export interface NewsArticle {
  id: number
  title: string
  image: string
  category: string
  timestamp: string
  description: string
}

export const useNewsStore = defineStore('news', () => {
  const articles = ref<NewsArticle[]>(newsData)
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(6)

  // Computed properties
  const filteredArticles = computed(() => {
    let filtered = articles.value

    if (searchQuery.value) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(article => article.category === selectedCategory.value)
    }

    return filtered
  })

  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredArticles.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredArticles.value.length / itemsPerPage.value)
  })

  const categories = computed(() => {
    const categorySet = new Set(articles.value.map(article => article.category))
    return Array.from(categorySet).sort()
  })

  const nigeriaNews = computed(() => {
    return articles.value.filter(article => article.category === 'Nigeria')
  })

  const internationalNews = computed(() => {
    return articles.value.filter(article => article.category === 'International')
  })

  const latestNews = computed(() => {
    return articles.value
      .slice()
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
  })

  // Actions
  function setSearchQuery(query: string) {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page when searching
  }

  function setCategory(category: string) {
    selectedCategory.value = category
    currentPage.value = 1 // Reset to first page when filtering
  }

  function setPage(page: number) {
    currentPage.value = page
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedCategory.value = ''
    currentPage.value = 1
  }

  function getArticleById(id: number): NewsArticle | undefined {
    return articles.value.find(article => article.id === id)
  }

  return {
    // State
    articles,
    searchQuery,
    selectedCategory,
    currentPage,
    itemsPerPage,
    // Getters
    filteredArticles,
    paginatedArticles,
    totalPages,
    categories,
    nigeriaNews,
    internationalNews,
    latestNews,
    // Actions
    setSearchQuery,
    setCategory,
    setPage,
    clearFilters,
    getArticleById
  }
})