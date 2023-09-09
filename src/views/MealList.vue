<template>
  <div class="container">
    <div class="meallist">
      <MealItem v-for="(meal, key) in meals" :key="key" :id="key" :data="meal" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MealItem from '@/components/meal/MealItem.vue'

const initialMeals = {
  week_day0: '000000000000000000000000000000000000000000000000',
  week_day1: '111111111111111111111111111111111111111111111111',
  week_day2: '000000111111000000000000000000000000000000000000',
  week_day3: '000000000000111111000000000000000000000000000000',
  week_day4: '000000000000000000000000111111111111000000000000',
  week_day5: '000000000000000000000000000000000000111111111110',
  week_day6: '111111111111111111111111111111111111111111111111'
}
const meals = ref(initialMeals)
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.meallist {
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  gap: 0.5rem;
  min-width: 500px;
}
</style>
