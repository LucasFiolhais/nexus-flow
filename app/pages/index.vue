<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <div class="page-wrapper">
    <BoardFilters />

    <div class="board">
      <Column v-for="column in taskStore.filteredColumns" :key="column.title" :column="column" />
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  padding: 24px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.board {
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
}
</style>
