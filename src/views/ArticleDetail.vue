<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="article" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to News
      </button>

      <!-- Article Header -->
      <article class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="relative">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-64 md:h-96 object-cover"
          />
          <div class="absolute top-6 left-6">
            <span class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium capitalize">
              {{ article.category }}
            </span>
          </div>
        </div>

        <div class="p-8">
          <!-- Title -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ article.title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center text-gray-600 text-sm mb-6 space-x-6">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {{ article.author }}
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ formatDate(article.timestamp) }}
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              {{ article.readTime }}
            </div>
          </div>

          <!-- Article Content -->
          <div class="prose prose-lg max-w-none">
            <p class="text-xl text-gray-700 leading-relaxed mb-6">
              {{ article.description }}
            </p>
            
            <!-- Extended content would go here in a real application -->
            <div class="text-gray-700 leading-relaxed space-y-4">
              <p>
                This is where the full article content would be displayed. In a real application, 
                you would have the complete article text stored in your data source and rendered here.
              </p>
              <p>
                The article would continue with more detailed information about the topic, 
                providing comprehensive coverage of the news story with proper journalistic standards.
              </p>
              <p>
                Additional paragraphs would follow, maintaining proper formatting and readability 
                for the best user experience.
              </p>
            </div>
          </div>

          <!-- Social Sharing -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
            <div class="flex space-x-4">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Share on Twitter
              </button>
              <button class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors">
                Share on Facebook
              </button>
              <button class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Articles -->
      <section class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            :article="relatedArticle"
          />
        </div>
      </section>
    </div>

    <div v-else class="flex flex-col items-center justify-center min-h-screen text-center">
      <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.044-5.691-2.709M20 12a8 8 0 11-16 0 8 8 0 0116 0z"></path>
      </svg>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Article Not Found</h2>
      <p class="text-gray-500 mb-4">The article you're looking for doesn't exist.</p>
      <router-link to="/" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from '../stores/news'
import NewsCard from '../components/NewsCard.vue'

export default {
  name: 'ArticleDetail',
  components: {
    NewsCard
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    article() {
      const newsStore = useNewsStore()
      return newsStore.getArticleById(this.id)
    },
    relatedArticles() {
      const newsStore = useNewsStore()
      if (!this.article) return []
      
      return newsStore.articles
        .filter(a => a.id !== this.article.id && a.category === this.article.category)
        .slice(0, 3)
    }
  },
  async created() {
    const newsStore = useNewsStore()
    if (newsStore.articles.length === 0) {
      await newsStore.loadArticles()
    }
    this.loading = false
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>