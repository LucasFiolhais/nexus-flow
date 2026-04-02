<script setup lang="ts">
import type { Task } from '~/types/kanban'

const taskStore = useTaskStore()
const props = defineProps<{ task: Task }>()
const { formatDate } = useFormatter()

const deleteTask = () => {
  if (confirm('Eliminar esta tarefa?')) {
    taskStore.removeTask(props.task.id)
  }
}
</script>

<template>
  <div class="card">
    <button class="btn-delete" @click.stop="deleteTask" title="Eliminar">&times;</button>

    <h3 class="title">{{ task.title }}</h3>
    <p class="desc">{{ task.description }}</p>

    <footer class="footer">
      <div class="meta">
        <span class="date">{{ formatDate(task.createdAt) }}</span>
        <span :class="['badge', task.priority]">
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
  position: relative;
}

.card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.btn-delete {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  color: #475569;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: 0.2s;
}

.btn-delete:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.title {
  font-size: 14px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
  padding-right: 20px;
}

.desc {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
  overflow-wrap: break-word;
  white-space: pre-wrap;
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
  font-size: 10px;
  color: #64748b;
}

.id {
  font-size: 9px;
  color: #475569;
}

.badge {
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  width: fit-content;
}

.low {
  background-color: #10b981;
}
.medium {
  background-color: #f59e0b;
}
.high {
  background-color: #ef4444;
}
</style>
