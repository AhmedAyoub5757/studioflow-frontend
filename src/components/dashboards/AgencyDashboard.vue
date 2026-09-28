
<script setup>
import StatCard from '@/components/StatCard.vue'
import { money } from '@/utils/format'
defineProps({ data: Object })
</script>

<template>
  <div class="space-y-6">
    <section>
      <h2 class="font-semibold mb-2">Projects</h2>
      <div class="grid grid-cols-3 gap-4">
        <StatCard label="Total" :value="data.projects.total" />
        <StatCard label="In progress" :value="data.projects.in_progress" />
        <StatCard label="Completed" :value="data.projects.completed" tone="success" />
      </div>
    </section>
    <section>
      <h2 class="font-semibold mb-2">Delivery</h2>
      <div class="grid grid-cols-4 gap-4">
        <StatCard label="Open tasks" :value="data.tasks.open" />
        <StatCard label="Overdue tasks" :value="data.tasks.overdue" :tone="data.tasks.overdue ? 'danger' : 'default'" />
        <StatCard label="Open bugs" :value="data.bugs.open" />
        <StatCard label="Critical bugs" :value="data.bugs.critical_open" :tone="data.bugs.critical_open ? 'danger' : 'default'" />
      </div>
    </section>
    <section>
      <h2 class="font-semibold mb-2">Revenue</h2>
      <div class="grid grid-cols-2 gap-4">
        <StatCard label="Outstanding" :value="money(data.invoices.outstanding_total)" tone="warning" />
        <StatCard label="Paid this month" :value="money(data.invoices.paid_this_month)" tone="success" />
      </div>
    </section>
  </div>
</template>