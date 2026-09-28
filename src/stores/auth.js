import { defineStore } from "pinia";
import { computed, ref } from "vue";
import http from "@/api/http";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(null);

  const isAuthenticated = computed(() => !!token.value);
  const roleNames = computed(() => user.value?.roles?.map((r) => r.name) ?? []);

  const permissionNames = computed(() => {
    const perms = user.value?.roles?.flatMap((r) => r.permissions ?? []) ?? [];
    return perms.map((p) => p.name);
  });

  function hasRole(role) {
    return roleNames.value.includes(role);
  }

  function hasAnyRole(roles) {
    if (hasRole("super_admin")) return true;
    return roles.some((r) => roleNames.value.includes(r));
  }

  // UX-only check. The backend is the real security boundary.
  function can(permission) {
    if (hasRole("super_admin")) return true; // mirrors Gate::before
    return permissionNames.value.includes(permission);
  }

  async function login(email, password) {
    const { data } = await http.post("/login", { email, password });
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem("token", data.token);
  }

  async function fetchUser() {
    // Note: /me returns the user directly, with no "data" wrapper
    const { data } = await http.get("/me");
    user.value = data;
  }

  async function logout() {
    try {
      await http.post("/logout");
    } finally {
      // Clear local state even if the API call fails (e.g. token already expired)
      token.value = null;
      user.value = null;
      localStorage.removeItem("token");
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    roleNames,
    hasRole,
    hasAnyRole,
    can,
    login,
    fetchUser,
    logout,
  };
});
