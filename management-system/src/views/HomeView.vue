<template>
  <div class="home">
    <h1>Daftar Buku</h1>

    <!-- Tombol untuk admin -->
    <div v-if="auth.role === 'Admin'" class="admin-actions">
      <button @click="goToCreate">+ Tambah Buku</button>
    </div>

    <div class="user-actions">
      <button @click="goToHistory">📚 Lihat History Pinjaman</button>
    </div>
    <button @click="logout">Logout</button>

    <!-- Notifikasi pesan -->
    <div v-if="message" class="notif">
      {{ message }}
    </div>

    <BookList
      :books="books"
      :isAdmin="auth.role === 'Admin'"
      @pinjam="pinjamBuku"
      @edit="editBuku"
      @hapus="hapusBuku"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BookList from '@/components/BookList.vue'

const books = ref([])
const message = ref('')
const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const res = await fetch('http://localhost:5022/book', {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  const data = await res.json()
  books.value = data.book
})

const goToCreate = () => router.push('/book/create')
const goToHistory = () => router.push('/history')

// simulasi peminjaman buku
const pinjamBuku = async (book) => {
  try {
    const res = await fetch('http://localhost:5022/borrow-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ book_id: book.book_id }),
    })

    if (!res.ok) {
      const data = await res.json()
      message.value = data.message || 'Gagal meminjam buku'
      return
    }

    message.value = `✅ Buku "${book.title}" berhasil dipinjam!`

    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (err) {
    console.log(err)
    message.value = 'Terjadi kesalahan jaringan'
  }
}

const editBuku = (book) => router.push(`/book/edit/${book.book_id}`)

const hapusBuku = async (book) => {
  if (confirm(`Yakin ingin hapus buku "${book.title}"?`)) {
    await fetch(`http://localhost:5022/book/${book.book_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    books.value = books.value.filter((b) => b.order_id !== book.book_id)
  }
}
</script>
