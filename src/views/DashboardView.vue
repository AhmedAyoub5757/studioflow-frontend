<script setup>
import { computed, onMounted, ref } from 'vue'
import http from '@/api/http'
import { useAuthStore } from '@/stores/auth'
import AgencyDashboard from '@/components/dashboards/AgencyDashboard.vue'
import PmDashboard from '@/components/dashboards/PmDashboard.vue'
import StaffDashboard from '@/components/dashboards/StaffDashboard.vue'
import QaDashboard from '@/components/dashboards/QaDashboard.vue'
import FinanceDashboard from '@/components/dashboards/FinanceDashboard.vue'
import ClientDashboard from '@/components/dashboards/ClientDashboard.vue'

const auth = useAuthStore()

// Maps the API's `role` discriminator to a component
const componentMap = {
  agency_overview: AgencyDashboard,
  project_manager: PmDashboard,
  staff: StaffDashboard,
  qa: QaDashboard,
  finance: FinanceDashboard,
  client: ClientDashboard,
}

const data = ref(null)
const loading = ref(true)
const error = ref('')

const activeComponent = computed(() => componentMap[data.value?.role] ?? null)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const res = await http.get('/dashboard')
    data.value = res.data.data // Resource-style wrapper: data.data
  } catch (e) {
    error.value = e.response
      ? `Failed to load dashboard (HTTP ${e.response.status}).`
      : 'Cannot reach the server.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="dashboard-view">
    <header class="dashboard-header">
      <div><p class="eyebrow">Studio overview</p><h1>Good morning, {{ auth.user?.name?.split(' ')[0] || 'there' }}.</h1></div>
      <div class="dashboard-date">{{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</div>
    </header>

    <div v-if="loading" class="dashboard-state"><span class="loading-pulse"></span><p>Gathering your studio overview...</p></div>

    <div v-else-if="error" class="dashboard-error">
      <p>{{ error }}</p>
      <button @click="load">Try again <span>&#8594;</span></button>
    </div>

    <component v-else-if="activeComponent" :is="activeComponent" :data="data" />

    <p v-else class="dashboard-state">
      {{ data?.message ?? 'No dashboard available for your role.' }}
    </p>
  </div>
</template>

<style scoped>
.dashboard-view { max-width: 1280px; margin: 0 auto; }.dashboard-header { display: flex; align-items: end; justify-content: space-between; margin-bottom: 4rem; }.eyebrow { color: var(--coral-deep); font-size: .7rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }.dashboard-header h1 { margin-top: .5rem; font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 400; letter-spacing: -.06em; }.dashboard-date { padding: .5rem .8rem; border: 1px solid var(--line); color: var(--muted); font-size: .72rem; }.dashboard-state { display: flex; min-height: 220px; align-items: center; justify-content: center; gap: .8rem; color: var(--muted); font-size: .88rem; }.loading-pulse { width: .7rem; height: .7rem; border-radius: 50%; background: var(--coral); animation: pulse 1.2s infinite ease-in-out; }.dashboard-error { padding: 1.2rem 1.4rem; border-left: 3px solid var(--coral); background: #fff0ed; color: var(--coral-deep); }.dashboard-error button { margin-top: .8rem; padding: 0; border: 0; background: none; color: inherit; font-size: .8rem; font-weight: 800; }.dashboard-error button span { margin-left: .3rem; }@keyframes pulse { 0%, 100% { opacity: .35; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.2); } }@media (max-width: 600px) { .dashboard-header { display: block; margin-bottom: 2.5rem; }.dashboard-date { display: inline-block; margin-top: 1rem; } }
</style>