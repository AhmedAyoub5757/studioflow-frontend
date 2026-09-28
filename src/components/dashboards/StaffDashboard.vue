<script setup>
import StatCard from '@/components/StatCard.vue'
defineProps({ data: Object })
</script>

<template>
  <div class="space-y-6">
    <section>
      <h2 class="font-semibold mb-2">My tasks</h2>
      <div class="grid grid-cols-4 gap-4">
        <StatCard label="To do" :value="data.my_tasks.todo" />
        <StatCard label="In progress" :value="data.my_tasks.in_progress" />
        <StatCard label="In review" :value="data.my_tasks.in_review" />
        <StatCard label="Overdue" :value="data.my_tasks.overdue" :tone="data.my_tasks.overdue ? 'danger' : 'default'" />
      </div>
    </section>
    <div class="grid grid-cols-2 gap-4">
      <StatCard label="My open bugs" :value="data.my_open_bugs" />
      <StatCard label="Hours logged this week" :value="Number(data.hours_logged_this_week).toFixed(1)" />
    </div>
  </div>
</template>