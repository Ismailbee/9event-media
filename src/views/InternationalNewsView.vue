<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="bg-purple-600 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            International News
          </h1>
          <p class="text-xl text-purple-100">
            Global news and international updates
          </p>
        </div>
      </div>
    </section>

    <!-- News Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Statistics -->
        <div class="mb-8 text-center">
          <p class="text-gray-600 text-lg">
            {{ internationalNews.length }} international articles
          </p>
        </div>

        <!-- News Grid with International-specific filter -->
        <InternationalNewsGrid />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import InternationalNewsGrid from '@/components/InternationalNewsGrid.vue'

const newsStore = useNewsStore()
const { internationalNews } = newsStore

// Set filter to International when component mounts
onMounted(() => {
  newsStore.setCategory('International')
})

// Clear filters when leaving the page
onUnmounted(() => {
  newsStore.clearFilters()
})
</script>