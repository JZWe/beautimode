<template>
  <HeaderView />
  <RouterView />
</template>
<script setup lang="ts">
import HeaderView from './components/HeaderView.vue'
import { RouterView } from 'vue-router'
</script>
<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
