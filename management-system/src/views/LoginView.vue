<template>
  <div class="login-container">
    <h2>Login ke Mini Library</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p class="error" v-if="error">{{ error }}</p>
      <p>Belum punya akun? <RouterLink to="/register">Register</RouterLink></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/stores/auth'

const router = useRouter()
// const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  const res = await fetch('http://localhost:5022/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })

  const data = await res.json()
  if (!res.ok) {
    error.value = data.message || 'Login gagal'
    return
  }

  //   authStore.setToken(data.token)
  localStorage.setItem('token', data.token)
  router.push('/')
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 0.75rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
