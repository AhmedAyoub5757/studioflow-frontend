export const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '🏠' },
  { label: 'Projects', to: '/projects', icon: '📁' },
  {
    label: 'Tasks',
    to: '/tasks',
    icon: '✅',
    roles: ['agency_manager', 'project_manager', 'developer', 'designer', 'qa'],
  },
  {
    label: 'Bugs',
    to: '/bugs',
    icon: '🐞',
    roles: ['agency_manager', 'project_manager', 'developer', 'qa'],
  },
  {
    label: 'Invoices',
    to: '/invoices',
    icon: '💳',
    roles: ['agency_manager', 'project_manager', 'finance', 'client'],
  },
  { label: 'Staff', to: '/staff', icon: '👥', permission: 'users.manage' },
  { label: 'Notifications', to: '/notifications', icon: '🔔' },
]

export function visibleNavItems(auth) {
  return navItems.filter((item) => {
    if (item.roles) return auth.hasAnyRole(item.roles)
    if (item.permission) return auth.can(item.permission)
    return true
  })
}