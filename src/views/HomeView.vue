<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            Welcome to 9Event Media
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Your trusted source for the latest news from Nigeria and around the world
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/nigeria"
              class="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Nigeria News
            </RouterLink>
            <RouterLink
              to="/international"
              class="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              International News
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News
          </h2>
          <p class="text-gray-600 text-lg">
            Stay updated with the most recent stories and breaking news
          </p>
        </div>

        <!-- Latest Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <NewsCard
            v-for="article in latestNews.slice(0, 6)"
            :key="article.id"
            :article="article"
            @read-more="handleReadMore"
          />
        </div>

        <!-- View All News Button -->
        <div class="text-center">
          <RouterLink
            to="/categories"
            class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            View All News
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Categories Preview -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News Categories
          </h2>
          <p class="text-gray-600 text-lg">
            Explore news by category
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <RouterLink
            v-for="category in categories.slice(0, 8)"
            :key="category"
            :to="`/categories?category=${category}`"
            class="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg p-6 text-center transition-all duration-200 group"
          >
            <div class="text-2xl mb-3">📰</div>
            <h3 class="font-semibold text-gray-900 group-hover:text-blue-600">
              {{ category }}
            </h3>
            <p class="text-sm text-gray-500 mt-2">
              {{ getCategoryCount(category) }} articles
            </p>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useNewsStore } from '@/stores/newsStore'
import NewsCard from '@/components/NewsCard.vue'

const newsStore = useNewsStore()

const { latestNews, categories, articles } = newsStore

function getCategoryCount(category: string): number {
  return articles.filter(article => article.category === category).length
}

function handleReadMore(articleId: number) {
  console.log('Read more article:', articleId)
  // In a real app, you would navigate to the article detail page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
