<template>
  <div class="create-book">
    <h2>Tambah Buku Baru</h2>

    <form @submit.prevent="handleSubmit">
      <input v-model="title" type="text" placeholder="Judul Buku" required />
      <textarea v-model="description" placeholder="Deskripsi" required></textarea>
      <input v-model.number="stock" type="number" placeholder="Stok Buku" min="1" required />

      <button type="submit">Simpan</button>

      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const title = ref('')
const description = ref('')
const stock = ref(1)
const message = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleSubmit = async () => {
  try {
    const res = await fetch('http://localhost:5022/create-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        stock: stock.value,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      message.value = data.message || 'Gagal membuat buku'
      return
    }

    message.value = '✅ Buku berhasil ditambahkan!'
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err) {
    console.error(err)
    message.value = 'Terjadi kesalahan jaringan'
  }
}
</script>

<style scoped>
.create-book {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background: #f4f4f4;
  border-radius: 8px;
}

input,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
}

.message {
  margin-top: 1rem;
  color: green;
}
</style>
