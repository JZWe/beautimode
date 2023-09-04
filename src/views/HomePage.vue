<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/todolist">TodoList</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
