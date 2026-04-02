<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <div class="board">
    <Column v-for="column in taskStore.columns" :key="column.title" :column="column" />
  </div>
</template>

<style scoped>
.board {
  display: flex;
  gap: 20px;
  padding: 20px;
  width: 100%;
  height: 800px;
  align-items: flex-start;
}
</style>
