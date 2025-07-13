<template>
  <div class="home">
    <h1>Daftar Buku</h1>
    <button @click="logout">Logout</button>
    <BookList :books="books" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BookList from '@/components/BookList.vue'

const books = ref([])
const router = useRouter()
const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push('/login')
}

onMounted(async () => {
  const res = await fetch('http://localhost:5022/books', {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  books.value = await res.json()
})
</script>

<style scoped>
.home {
  padding: 2rem;
}
</style>
