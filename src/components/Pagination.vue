<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      :class="[
        'px-3 py-2 rounded-md text-sm font-medium',
        currentPage === 1
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
      ]"
    >
      Previous
    </button>

    <div class="flex space-x-1">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-2 rounded-md text-sm font-medium',
          currentPage === page
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      :class="[
        'px-3 py-2 rounded-md text-sm font-medium',
        currentPage === totalPages
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
      ]"
    >
      Next
    </button>
  </div>
</template>

<script>
import { useNewsStore } from '../stores/news'

export default {
  name: 'Pagination',
  computed: {
    currentPage() {
      const newsStore = useNewsStore()
      return newsStore.currentPage
    },
    totalPages() {
      const newsStore = useNewsStore()
      return newsStore.totalPages
    },
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        const newsStore = useNewsStore()
        newsStore.setPage(page)
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>