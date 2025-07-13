<template>
  <ul class="book-list">
    <li v-for="book in books" :key="book.order_id">
      <h3>{{ book.title }}</h3>
      <p>{{ book.description }}</p>

      <!-- Jika Admin -->
      <div v-if="isAdmin">
        <button @click="$emit('edit', book)">Edit</button>
        <button @click="$emit('hapus', book)">Hapus</button>
        <button @click="$emit('pinjam', book)">Pinjam Buku</button>
      </div>

      <!-- Jika User -->
      <div v-else>
        <button @click="$emit('pinjam', book)">📚 Pinjam</button>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps(['books', 'isAdmin']) // terima info apakah admin
</script>

<style scoped>
.book-list {
  list-style: none;
  padding: 0;
}
.book-list li {
  background: #fafafa;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 4px #ddd;
}
button {
  margin-right: 0.5rem;
}
</style>
