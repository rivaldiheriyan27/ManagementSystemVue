<template>
  <div class="edit-book">
    <h2>Edit Buku</h2>

    <form @submit.prevent="handleUpdate">
      <input v-model="title" type="text" placeholder="Judul Buku" required />
      <textarea v-model="description" placeholder="Deskripsi" required></textarea>
      <input v-model.number="stock" type="number" placeholder="Stok Buku" min="1" required />

      <button type="submit">Simpan Perubahan</button>

      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const title = ref('')
const description = ref('')
const stock = ref(1)
const message = ref('')

const bookId = route.params.id

// Ambil detail buku berdasarkan ID saat halaman dibuka
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:5022/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    const data = await res.json()

    if (!res.ok) {
      message.value = data.message || 'Gagal mengambil detail buku'
      return
    }

    console.log(data, 'ini datranyaa')
    // Tapi kalau data.book baru isinya, pakai ini:
    title.value = data.title
    description.value = data.description
    stock.value = data.stock
  } catch (err) {
    console.error(err)
    message.value = 'Terjadi kesalahan saat ambil data buku'
  }
})

const handleUpdate = async () => {
  try {
    const res = await fetch(`http://localhost:5022/edit-book/${bookId}`, {
      method: 'PUT',
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
      message.value = data.message || 'Gagal update buku'
      return
    }

    message.value = '✅ Buku berhasil diupdate!'
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err) {
    console.error(err)
    message.value = 'Terjadi kesalahan saat mengirim update'
  }
}
</script>

<style scoped>
.edit-book {
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
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 5px;
}

.message {
  margin-top: 1rem;
  color: green;
}
</style>
