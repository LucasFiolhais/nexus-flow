<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '~/types/kanban'

const taskStore = useTaskStore()
const props = defineProps<{ task: Task }>()
const { formatDate } = useFormatter()

const deleteTask = () => {
  taskStore.removeTask(props.task.id)
}

const changeColumn = (event: Event) => {
  const select = event.target as HTMLSelectElement
  taskStore.moveTask(props.task.id, select.value)
}

const currentColumn = computed(() => {
  return taskStore.columns.find((col) => col.tasks.some((t) => t.id === props.task.id))?.title
})

const deadlineStatus = computed(() => {
  if (currentColumn.value === 'Done' || !props.task.dueDate) return null

  const today = new Date().setHours(0, 0, 0, 0)
  const due = new Date(props.task.dueDate).setHours(0, 0, 0, 0)
  const diffInDays = (due - today) / (1000 * 60 * 60 * 24)

  if (diffInDays < 0) return 'is-overdue'
  if (diffInDays <= 2) return 'is-near-due'
  return null
})

const isOverdue = computed(() => deadlineStatus.value === 'is-overdue')
</script>

<template>
  <div :class="['card', deadlineStatus]">
    <button class="btn-delete" @click.stop="deleteTask" title="Eliminar">&times;</button>

    <h3 class="title">{{ task.title }}</h3>
    <p class="desc">{{ task.description }}</p>

    <div v-if="task.dueDate" :class="['deadline', { overdue: isOverdue }]">
      <span class="icon">Data Limite:</span>
      {{ formatDate(task.dueDate) }}
      <span v-if="isOverdue" class="alert-text">(Atrasada)</span>
    </div>

    <footer class="footer">
      <div class="meta">
        <span class="date">Criado em: {{ formatDate(task.createdAt) }}</span>
        <span :class="['badge', task.priority]">
          {{ task.priority }}
        </span>
      </div>
      <div class="footer-right">
        <span class="id">#{{ task.id }}</span>
        <select :value="currentColumn" @change="changeColumn" class="select-status">
          <option value="To do">TO DO</option>
          <option value="In Progress">IN PROGRESS</option>
          <option value="Done">DONE</option>
        </select>
      </div>
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

.card.is-overdue {
  border: 1px solid #ef4444;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.1);
}

.card.is-near-due {
  border: 1px solid #f97316;
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.1);
}

.card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.deadline {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  background: rgba(15, 23, 42, 0.4);
  padding: 4px 8px;
  border-radius: 6px;
  width: fit-content;
}

.overdue {
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
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

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

.select-status {
  background: #0f172a;
  border: 1px solid #334155;
  color: #64748b;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 6px;
  cursor: pointer;
  outline: none;
  width: fit-content;
  text-transform: uppercase;
  font-weight: 600;
}

.select-status:hover {
  border-color: #3b82f6;
  color: #f8fafc;
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
