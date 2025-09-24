import { defineStore } from 'pinia'
import newsData from '../data/news.json'

export const useNewsStore = defineStore('news', {
  state: () => ({
    articles: [],
    filteredArticles: [],
    searchQuery: '',
    selectedCategory: 'all',
    currentPage: 1,
    articlesPerPage: 6,
    loading: false
  }),

  getters: {
    categories: (state) => {
      const categories = ['all', ...new Set(state.articles.map(article => article.category))]
      return categories
    },

    paginatedArticles: (state) => {
      const startIndex = (state.currentPage - 1) * state.articlesPerPage
      const endIndex = startIndex + state.articlesPerPage
      return state.filteredArticles.slice(startIndex, endIndex)
    },

    totalPages: (state) => {
      return Math.ceil(state.filteredArticles.length / state.articlesPerPage)
    },

    nigeriaNews: (state) => {
      return state.articles.filter(article => article.category === 'nigeria')
    },

    internationalNews: (state) => {
      return state.articles.filter(article => article.category === 'international')
    }
  },

  actions: {
    async loadArticles() {
      this.loading = true
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        this.articles = newsData
        this.filteredArticles = newsData
      } catch (error) {
        console.error('Error loading articles:', error)
      } finally {
        this.loading = false
      }
    },

    searchArticles(query) {
      this.searchQuery = query
      this.filterArticles()
    },

    filterByCategory(category) {
      this.selectedCategory = category
      this.currentPage = 1
      this.filterArticles()
    },

    filterArticles() {
      let filtered = [...this.articles]

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query)
        )
      }

      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(article => article.category === this.selectedCategory)
      }

      this.filteredArticles = filtered
    },

    setPage(page) {
      this.currentPage = page
    },

    getArticleById(id) {
      return this.articles.find(article => article.id === parseInt(id))
    }
  }
})