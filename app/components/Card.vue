<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '~/types/kanban'
import { useTaskStore } from '~/stores/taskStore'

const taskStore = useTaskStore()
const props = defineProps<{ task: Task }>()
const { formatDate } = useFormatter()

const openTaskModal = () => {
  taskStore.selectTask(props.task)
}

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
  if (currentColumn.value?.toUpperCase() === 'DONE') return 'is-done'
  if (!props.task.dueDate) return null
  const today = new Date().setHours(0, 0, 0, 0)
  const due = new Date(props.task.dueDate).setHours(0, 0, 0, 0)
  const diffInDays = (due - today) / (1000 * 60 * 60 * 24)

  if (diffInDays < 0) return 'is-overdue'
  if (diffInDays <= 2) return 'is-near-due'
  return null
})

const isOverdue = computed(() => {
  return currentColumn.value?.toUpperCase() !== 'DONE' && deadlineStatus.value === 'is-overdue'
})
</script>

<template>
  <div :class="['card', deadlineStatus]" @click="openTaskModal">
    <button class="btn-delete" @click.stop="deleteTask" title="Eliminar">&times;</button>

    <h3 class="title">{{ task.title }}</h3>
    <p class="desc">{{ task.description }}</p>

    <div v-if="task.dueDate" :class="['deadline', { overdue: isOverdue }]">
      <span class="deadline-label">Data Limite:</span>
      <span class="deadline-text">{{ formatDate(task.dueDate) }}</span>
      <span v-if="isOverdue" class="alert-text">(Atrasada)</span>
    </div>

    <footer class="footer">
      <div class="footer-top">
        <span class="date">Criado em: {{ formatDate(task.createdAt) }}</span>
        <span :class="['badge', task.priority]">
          {{ task.priority }}
        </span>
      </div>

      <div class="footer-bottom">
        <span class="id">#{{ task.id }}</span>

        <select
          :value="currentColumn"
          @change="changeColumn"
          @click.stop
          @touchstart.stop
          @mousedown.stop
          class="select-status"
        >
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
  border-radius: 12px;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s;
  position: relative;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.card.is-overdue {
  border: 1px solid #ef4444;
}
.card.is-near-due {
  border: 1px solid #f97316;
}
.card.is-done {
  border: 1px solid #10b981;
  opacity: 0.8;
}

.card.is-done .desc,
.card.is-done .title {
  color: #64748b;
  text-decoration: line-through;
}

.deadline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 11px;
  background: rgba(15, 23, 42, 0.6);
  padding: 6px 10px;
  border-radius: 8px;
  width: fit-content;
  max-width: 100%;
}

.deadline-label {
  font-weight: 800;
  color: #60a5fa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.deadline-text {
  font-weight: 600;
  color: #f8fafc;
  white-space: nowrap;
}

.overdue .deadline-label,
.overdue .deadline-text {
  color: #f87171;
}

.alert-text {
  font-weight: 700;
  color: #f87171;
}

.btn-delete {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #334155;
  border: none;
  color: #94a3b8;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 20;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
  padding-right: 25px;
}

.desc {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
  white-space: pre-line;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  max-height: 3.2em;
  line-height: 1.6;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
  border-top: 1px solid #334155;
  padding-top: 12px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-status {
  background: #0f172a;
  border: 1px solid #475569;
  color: #f8fafc;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  min-height: 28px;
}

.badge {
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
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

.date {
  font-size: 10px;
  color: #64748b;
}
.id {
  font-size: 9px;
  color: #475569;
}
</style>
