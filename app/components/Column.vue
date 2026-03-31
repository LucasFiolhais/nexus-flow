<script setup lang="ts">
import { type Column } from '~/types/kanban'

defineProps<{
  column: Column
}>()
</script>

<template>
  <section class="column">
    <div class="column-header">
      <h2 class="column-title">{{ column.title }}</h2>
      <span class="badge">{{ column.tasks.length }}</span>
    </div>

    <div class="list">
      <Card v-for="task in column.tasks" :key="task.id" :task="task" />
    </div>
  </section>
</template>

<style scoped>
.column {
  width: 300px;
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid #1e293b;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.column-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-title {
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
  margin: 0;
}

.badge {
  font-size: 12px;
  background-color: #1e293b;
  padding: 2px 8px;
  border-radius: 4px;
  color: #64748b;
}

.list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
</style>
