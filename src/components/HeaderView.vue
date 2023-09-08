<template>
  <nav class="header">
    <RouterLink to="/todolist">TodoList</RouterLink>
    <RouterLink to="/meallist">MealList</RouterLink>
  </nav>
</template>
<script setup lang="ts"></script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
