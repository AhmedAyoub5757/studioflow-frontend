<script setup>
import StatCard from '@/components/StatCard.vue'
import { money } from '@/utils/format'
defineProps({ data: Object })
</script>

<template>
  <div class="space-y-6">
    <section>
      <h2 class="font-semibold mb-2">Invoices</h2>
      <div class="grid grid-cols-4 gap-4">
        <StatCard label="Draft" :value="data.invoices.draft" />
        <StatCard label="Sent" :value="data.invoices.sent" />
        <StatCard label="Overdue" :value="data.invoices.overdue" :tone="data.invoices.overdue ? 'danger' : 'default'" />
        <StatCard label="Paid this month" :value="money(data.invoices.paid_this_month)" tone="success" />
      </div>
    </section>
    <div class="grid grid-cols-3 gap-4">
      <StatCard label="Outstanding total" :value="money(data.outstanding_total)" tone="warning" />
      <StatCard label="Active subscriptions" :value="data.active_subscriptions" />
      <StatCard label="Billing due this week" :value="data.subscriptions_due_this_week" />
    </div>
  </div>
</template>