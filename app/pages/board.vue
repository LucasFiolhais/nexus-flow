<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <div class="page-wrapper">
    <BoardStats />

    <div class="filters-section">
      <BoardFilters />
    </div>

    <div class="board">
      <Column v-for="column in taskStore.filteredColumns" :key="column.title" :column="column" />
    </div>

    <Modal />
  </div>
</template>

<style scoped>
.page-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px;
}

.filters-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.board {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 100%;
  align-items: flex-start;
  padding-bottom: 50px;
}
</style>
