<template>
  <div class="register-container">
    <h2>Register Akun Baru</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <select v-model="role" required>
        <option disabled value="">-- Pilih Role --</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>

      <button type="submit">Register</button>
      <p v-if="message" :class="{ error: isError }">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const message = ref('')
const isError = ref(false)

const router = useRouter()

const handleRegister = async () => {
  const res = await fetch('http://localhost:5022/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    isError.value = true
    message.value = data.message || 'Registrasi gagal'
    return
  }

  isError.value = false
  message.value = 'Registrasi berhasil! Silakan login.'
  setTimeout(() => router.push('/login'), 1500)
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
input,
select {
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
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
}
.error {
  color: red;
}
</style>
