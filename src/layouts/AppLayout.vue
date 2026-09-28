<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { visibleNavItems } from '@/config/navigation'

const auth = useAuthStore()
const router = useRouter()

const items = computed(() => visibleNavItems(auth))

async function logout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="app-shell">
    <aside class="app-sidebar">
      <RouterLink to="/dashboard" class="app-brand"><span>sf</span><i></i></RouterLink>
      <p class="app-sidebar__label">Your workspace</p>

      <nav class="app-nav">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="app-nav__link"
          active-class="is-active"
        >
          <span class="app-nav__icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="app-sidebar__footer">
        <p>Signed in as</p>
        <strong>{{ auth.user?.name }}</strong>
        <small>{{ auth.roleNames.join(', ') }}</small>
        <button @click="logout">Log out <span>&#8599;</span></button>
      </div>
    </aside>

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell { min-height: 100vh; display: flex; background: var(--paper); }
.app-sidebar { display: flex; width: 245px; flex: 0 0 245px; flex-direction: column; padding: 2.3rem 1.45rem 1.4rem; border-right: 1px solid var(--line); background: #fbfcf8; }
.app-brand { display: flex; align-items: center; gap: .65rem; color: var(--ink); font-size: 1.4rem; font-weight: 800; letter-spacing: -.08em; text-decoration: none; }.app-brand i { width: 9px; height: 9px; display: block; border-radius: 50%; background: var(--coral); }
.app-sidebar__label { margin-top: 4.5rem; color: #9ca9a9; font-size: .68rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }.app-nav { margin-top: 1rem; }.app-nav__link { display: flex; align-items: center; gap: .75rem; padding: .78rem .7rem; border-radius: 3px; color: #82908e; font-size: .86rem; text-decoration: none; transition: color .2s, background .2s; }.app-nav__link:hover, .app-nav__link.is-active { background: #e6f2ee; color: var(--teal); font-weight: 800; }.app-nav__icon { width: 1.15rem; filter: grayscale(1); font-size: .88rem; text-align: center; }.app-nav__link.is-active .app-nav__icon { filter: none; }.app-sidebar__footer { margin-top: auto; padding-top: 1.4rem; border-top: 1px solid var(--line); }.app-sidebar__footer p, .app-sidebar__footer small { display: block; color: #9ca9a9; font-size: .7rem; }.app-sidebar__footer strong { display: block; margin-top: .35rem; overflow: hidden; font-size: .86rem; text-overflow: ellipsis; white-space: nowrap; }.app-sidebar__footer button { margin-top: 1.2rem; padding: 0; border: 0; background: none; color: var(--coral-deep); font-size: .76rem; font-weight: 800; }.app-sidebar__footer button span { margin-left: .3rem; }.app-content { min-width: 0; flex: 1; overflow-y: auto; padding: clamp(2rem, 5vw, 4rem); }
@media (max-width: 700px) { .app-shell { display: block; }.app-sidebar { width: 100%; padding: 1.1rem 1.2rem; border-right: 0; border-bottom: 1px solid var(--line); }.app-sidebar__label, .app-sidebar__footer { display: none; }.app-nav { display: flex; gap: .2rem; margin-top: 1rem; overflow-x: auto; }.app-nav__link { flex: 0 0 auto; white-space: nowrap; }.app-content { padding: 1.8rem 1.2rem 3rem; } }
</style>