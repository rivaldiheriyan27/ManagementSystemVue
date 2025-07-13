<template>
  <div class="history">
    <h2>📚 Riwayat Peminjaman Buku</h2>
    <button class="back-button" @click="router.push('/')">⬅️ Kembali ke Home</button>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama User</th>
          <th>Judul Buku</th>
          <th>Tanggal Pinjam</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(borrow, index) in borrows" :key="borrow.borrow_id">
          <td>{{ index + 1 }}</td>
          <td>{{ borrow.User.username }}</td>
          <td>{{ borrow.Book.title }}</td>
          <td>{{ formatDate(borrow.borrowed_at) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="borrows.length === 0">Belum ada data peminjaman buku.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

const auth = useAuthStore()
const borrows = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5022/list-borrow', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    const data = await res.json()

    if (res.ok) {
      borrows.value = data.borrows
    } else {
      console.error(data.message)
    }
  } catch (err) {
    console.error('Gagal mengambil data history:', err)
  }
})

const formatDate = (datetime) => {
  return new Date(datetime).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
</script>

<style scoped>
.history {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #3498db;
  color: white;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
