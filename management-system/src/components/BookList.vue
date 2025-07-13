<template>
  <ul class="book-list">
    <li v-for="book in books" :key="book.id">
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
    </li>
  </ul>
</template>

<script setup>
defineProps(['books'])
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
</style>
