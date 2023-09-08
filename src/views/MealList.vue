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
function createInitialMealData() {
  return Array.from({ length: 48 }, () => 0).join('')
}
const initialMeals = {
  week_day0: createInitialMealData(),
  week_day1: createInitialMealData(),
  week_day2: createInitialMealData(),
  week_day3: createInitialMealData(),
  week_day4: createInitialMealData(),
  week_day5: createInitialMealData(),
  week_day6: createInitialMealData()
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
.todolist {
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  gap: 0.5rem;
  min-width: 500px;
}
</style>
