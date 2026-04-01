<script setup lang="ts">
import draggable from 'vuedraggable'
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

    <draggable
      v-model="column.tasks"
      group="tasks"
      item-key="id"
      class="task-list"
      ghost-class="ghost-card"
      drag-class="drag-card"
      :animation="200"
    >
      <template #item="{ element }">
        <Card :task="element" />
      </template>
    </draggable>
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
}

.task-list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 150px; /* Importante para conseguir soltar tarefas numa coluna vazia */
}

/* Estilo do 'fantasma' (onde o card vai cair) */
.ghost-card {
  opacity: 0.5;
  background: #3b82f6 !important;
  border: 2px dashed #60a5fa !important;
}

.drag-card {
  transform: rotate(3deg);
}

.badge {
  font-size: 11px;
  background-color: #1e293b;
  padding: 2px 8px;
  border-radius: 4px;
  color: #64748b;
}
</style>
