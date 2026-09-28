
<script setup>
import StatCard from '@/components/StatCard.vue'
defineProps({ data: Object })
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <StatCard label="Bugs to verify" :value="data.bugs_to_verify" tone="warning" />
      <StatCard label="Bugs I reported" :value="data.my_reported_bugs" />
    </div>
    <section>
      <h2 class="font-semibold mb-2">Open bugs by severity</h2>
      <div class="grid grid-cols-4 gap-4">
        <StatCard
          v-for="sev in ['critical', 'high', 'medium', 'low']"
          :key="sev"
          :label="sev"
          :value="data.open_bugs_by_severity[sev] ?? 0"
          :tone="sev === 'critical' && data.open_bugs_by_severity[sev] ? 'danger' : 'default'"
        />
      </div>
    </section>
  </div>
</template>