import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/layouts/AppLayout.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ComingSoonView from '@/views/ComingSoonView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginView, meta: { guestOnly: true } },
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/dashboard' },
        { path: 'dashboard', name: 'dashboard', component: DashboardView },
        { path: 'projects', name: 'projects', component: ComingSoonView, meta: { title: 'Projects' } },
        {
          path: 'tasks', name: 'tasks', component: ComingSoonView,
          meta: { title: 'Tasks', roles: ['agency_manager', 'project_manager', 'developer', 'designer', 'qa'] },
        },
        {
          path: 'bugs', name: 'bugs', component: ComingSoonView,
          meta: { title: 'Bugs', roles: ['agency_manager', 'project_manager', 'developer', 'qa'] },
        },
        {
          path: 'invoices', name: 'invoices', component: ComingSoonView,
          meta: { title: 'Invoices', roles: ['agency_manager', 'project_manager', 'finance', 'client'] },
        },
        {
          path: 'staff', name: 'staff', component: ComingSoonView,
          meta: { title: 'Staff', permission: 'users.manage' },
        },
        { path: 'notifications', name: 'notifications', component: ComingSoonView, meta: { title: 'Notifications' } },
        { path: 'forbidden', name: 'forbidden', component: ForbiddenView },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }

  // Rebuild user after a page refresh (token in localStorage, state lost)
  if (auth.isAuthenticated && !auth.user) {
    try {
      await auth.fetchUser()
    } catch {
      await auth.logout()
      return { name: 'login' }
    }
  }

  // Role/permission gate (UX only; the API enforces the real rules)
  if (to.meta.roles && !auth.hasAnyRole(to.meta.roles)) {
    return { name: 'forbidden' }
  }
  if (to.meta.permission && !auth.can(to.meta.permission)) {
    return { name: 'forbidden' }
  }
})

export default router