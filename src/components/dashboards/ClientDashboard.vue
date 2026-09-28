<script setup>
import StatCard from '@/components/StatCard.vue'
import { money } from '@/utils/format'
defineProps({ data: Object })
</script>

<template>
  <div class="space-y-4">
    <p v-if="!data.projects.length" class="text-sm text-gray-500">
      You don't have any projects yet.
    </p>
    <div v-for="p in data.projects" :key="p.id" class="bg-white rounded-lg shadow p-5">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold">{{ p.name }}</h2>
        <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">{{ p.status }}</span>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <StatCard label="Awaiting your approval" :value="p.pending_milestone_approvals"
                  :tone="p.pending_milestone_approvals ? 'warning' : 'default'" />
        <StatCard label="Outstanding invoices" :value="money(p.outstanding_invoice_total)" />
      </div>
    </div>
  </div>
</template>