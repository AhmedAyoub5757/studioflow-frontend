<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">Welcome, {{ auth.user?.name }}</h1>
        <button @click="logout" class="text-sm text-red-600 hover:underline">Logout</button>
      </div>

      <p class="mt-4 text-sm text-gray-600">Your roles:</p>
      <div class="flex gap-2 mt-1">
        <span
          v-for="role in auth.roleNames"
          :key="role"
          class="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded"
        >
          {{ role }}
        </span>
      </div>

      <p class="mt-4 text-xs text-gray-400">Real dashboard comes in Sprint 8.</p>
    </div>
  </div>
</template>