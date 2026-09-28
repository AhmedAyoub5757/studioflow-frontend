<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h1 class="text-xl font-bold">{{ route.meta.title }}</h1>
    <p class="mt-2 text-sm text-gray-500">This page is built in a later sprint.</p>
  </div>
</template>