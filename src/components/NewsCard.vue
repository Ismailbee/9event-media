<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div class="relative">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-48 object-cover"
        loading="lazy"
      />
      <div class="absolute top-4 left-4">
        <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
          {{ article.category }}
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
        <router-link :to="`/article/${article.id}`">
          {{ article.title }}
        </router-link>
      </h3>
      
      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ article.description }}
      </p>
      
      <div class="flex items-center justify-between text-sm text-gray-500">
        <div class="flex items-center space-x-4">
          <span>{{ article.author }}</span>
          <span>{{ article.readTime }}</span>
        </div>
        <span>{{ formatDate(article.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>