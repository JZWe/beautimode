<template>
  <ul class="nav nav-tabs">
    <li v-for="tab in statusTabs" class="nav-item" :key="tab" @click="onTabClick(tab)">
      <a class="nav-link" :class="{ active: activeTab === tab }" aria-current="page" href="#">{{
        tab
      }}</a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useTodos, type TabStatus } from '@/composables/useTodos'
const { activeTab, setActiveTab } = useTodos()
const statusTabs = ref(['all', 'completed', 'undone'])
const onTabClick = (tab: string) => {
  setActiveTab(tab as TabStatus)
}
</script>
<style scoped>
.nav-item {
  text-transform: capitalize;
}
</style>
