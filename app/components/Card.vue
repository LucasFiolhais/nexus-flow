<script setup lang="ts">
import type { Task } from '~/types/kanban'

defineProps<{ task: Task }>()
const { formatDate } = useFormatter()

const priorityColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' }
</script>

<template>
  <div class="card">
    <h3 class="title">{{ task.title }}</h3>
    <p class="desc">{{ task.description }}</p>

    <footer class="footer">
      <div class="meta">
        <span class="date">{{ formatDate(task.createdAt) }}</span>
        <span class="badge" :style="{ backgroundColor: priorityColors[task.priority] }">
          {{ task.priority }}
        </span>
      </div>
      <span class="id">#{{ task.id }}</span>
    </footer>
  </div>
</template>

<style scoped>
.card {
  background: #1e293b;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: grab;
  transition: 0.2s;
}

.card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.title {
  font-size: 14px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
}
.desc {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date {
  font-size: 11px;
  color: #64748b;
}

.badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  width: fit-content;
}

.id {
  font-size: 10px;
  color: #475569;
}
</style>
