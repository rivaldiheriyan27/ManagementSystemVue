// src/stores/auth.js
import { defineStore } from 'pinia'

// stores/auth.js
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null, // ⬅️ Tambahkan ini
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setRole(role) {
      this.role = role
      localStorage.setItem('role', role)
    },
    logout() {
      this.token = null
      this.role = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    },
  },
})
