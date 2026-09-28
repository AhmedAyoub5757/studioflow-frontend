<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const fieldErrors = ref({})

async function submit() {
  loading.value = true
  errorMessage.value = ''
  fieldErrors.value = {}

  try {
    await auth.login(email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch (error) {
    const status = error.response?.status

    if (status === 422) {
      fieldErrors.value = error.response.data.errors // { email: ["..."], password: ["..."] }
    } else if (status === 401) {
      errorMessage.value = error.response.data.message // "Invalid credentials"
    } else if (!error.response) {
      errorMessage.value = 'Cannot reach the server. Is the API running?'
    } else {
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="submit" class="w-full max-w-sm bg-white p-8 rounded-lg shadow space-y-4">
      <h1 class="text-2xl font-bold text-gray-800">StudioFlow</h1>
      <p class="text-sm text-gray-500">Sign in to your account</p>

      <p v-if="errorMessage" class="text-sm text-red-600 bg-red-50 p-2 rounded">
        {{ errorMessage }}
      </p>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2"
        />
        <p v-if="fieldErrors.email" class="text-xs text-red-600 mt-1">{{ fieldErrors.email[0] }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2"
        />
        <p v-if="fieldErrors.password" class="text-xs text-red-600 mt-1">{{ fieldErrors.password[0] }}</p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>