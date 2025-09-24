<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="bg-green-600 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            Nigeria News
          </h1>
          <p class="text-xl text-green-100">
            Latest news and updates from Nigeria
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
            {{ nigeriaNews.length }} articles about Nigeria
          </p>
        </div>

        <!-- News Grid with Nigeria-specific filter -->
        <NigeriaNewsGrid />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import NigeriaNewsGrid from '@/components/NigeriaNewsGrid.vue'

const newsStore = useNewsStore()
const { nigeriaNews } = newsStore

// Set filter to Nigeria when component mounts
onMounted(() => {
  newsStore.setCategory('Nigeria')
})

// Clear filters when leaving the page
onUnmounted(() => {
  newsStore.clearFilters()
})
</script>