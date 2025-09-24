<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div class="relative">
      <img 
        :src="article.image" 
        :alt="article.title"
        class="w-full h-48 object-cover"
        loading="lazy"
      />
      <div class="absolute top-4 left-4">
        <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {{ article.category }}
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <div class="mb-2">
        <time class="text-gray-500 text-sm">
          {{ formatDate(article.timestamp) }}
        </time>
      </div>
      
      <h3 class="font-bold text-lg mb-3 text-gray-900 line-clamp-2">
        {{ article.title }}
      </h3>
      
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ article.description }}
      </p>
      
      <button 
        class="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
        @click="$emit('read-more', article.id)"
      >
        Read More →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsArticle } from '@/stores/newsStore'

interface Props {
  article: NewsArticle
}

defineProps<Props>()
defineEmits<{
  'read-more': [id: number]
}>()

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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