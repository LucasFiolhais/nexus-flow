<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <div class="board">
    <KanbanColumn v-for="column in taskStore.columns" :key="column.title" :column="column" />
    <button type="button" class="add-btn">
      <span>+ Adicionar Coluna</span>
    </button>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 20px;
  align-items: flex-start;
  height: calc(100vh - 120px);
}

.add-btn {
  width: 300px;
  height: 50px;
  flex-shrink: 0;
  border: 2px dashed #1e293b;
  border-radius: 12px;
  background: transparent;
  color: #475569;
  cursor: pointer;
}

.add-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}
</style>
