<script setup>
import StatCard from '@/components/StatCard.vue'
defineProps({ data: Object })
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-4 gap-4">
      <StatCard label="Managed projects" :value="data.managed_projects" />
      <StatCard label="Open bugs" :value="data.open_bugs" />
      <StatCard label="Pending approvals" :value="data.pending_approvals" tone="warning" />
      <StatCard label="Outstanding invoices" :value="data.outstanding_invoices" />
    </div>
    <section>
      <h2 class="font-semibold mb-2">Tasks by status</h2>
      <p v-if="!Object.keys(data.tasks_by_status).length" class="text-sm text-gray-500">No tasks yet.</p>
      <div class="grid grid-cols-4 gap-4">
        <StatCard
          v-for="(count, status) in data.tasks_by_status"
          :key="status"
          :label="status.replace('_', ' ')"
          :value="count"
        />
      </div>
    </section>
  </div>
</template>