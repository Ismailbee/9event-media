<template>
  <div class="flex flex-wrap gap-2 justify-center">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectCategory(category)"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
        selectedCategory === category
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
    >
      {{ formatCategory(category) }}
    </button>
  </div>
</template>

<script>
import { useNewsStore } from '../stores/news'

export default {
  name: 'CategoryFilter',
  computed: {
    categories() {
      const newsStore = useNewsStore()
      return newsStore.categories
    },
    selectedCategory() {
      const newsStore = useNewsStore()
      return newsStore.selectedCategory
    }
  },
  methods: {
    selectCategory(category) {
      const newsStore = useNewsStore()
      newsStore.filterByCategory(category)
    },
    formatCategory(category) {
      if (category === 'all') return 'All News'
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }
}
</script>