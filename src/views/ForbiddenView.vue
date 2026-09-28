<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h1 class="text-xl font-bold text-red-600">403: Access denied</h1>
    <p class="mt-2 text-sm text-gray-500">Your role doesn't have access to this page.</p>
    <RouterLink to="/dashboard" class="text-sm text-indigo-600 hover:underline">Back to dashboard</RouterLink>
  </div>
</template>