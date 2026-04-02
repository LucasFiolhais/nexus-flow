<script setup lang="ts">
import draggable from 'vuedraggable'
import type { Task, Column } from '~/types/kanban'
import { useTaskStore } from '~/stores/taskStore'

const props = defineProps<{
  column: Column
}>()

const newTaskPriority = ref<'low' | 'medium' | 'high'>('medium')

const taskStore = useTaskStore()

const newTaskTitle = ref('')
const newTaskDescription = ref('')
newTaskPriority.value = 'medium'
const isAdding = ref(false)

const addTask = () => {
  if (!newTaskTitle.value.trim()) return

  const newTask: Task = {
    id: Date.now(),
    title: newTaskTitle.value,
    description: newTaskDescription.value.trim() || 'Sem descrição',
    priority: newTaskPriority.value,
    createdAt: new Date().toISOString() as any
  }

  taskStore.addTaskToColumn(props.column.title, newTask)

  newTaskTitle.value = ''
  newTaskDescription.value = ''
  isAdding.value = false
}
</script>

<template>
  <section class="column">
    <div class="column-header">
      <div class="title-group">
        <h2 class="column-title">{{ column.title }}</h2>
        <span class="badge">{{ column.tasks.length }}</span>
      </div>
    </div>

    <draggable
      v-model="column.tasks"
      group="tasks"
      item-key="id"
      class="task-list"
      ghost-class="ghost-card"
    >
      <template #item="{ element }">
        <Card :task="element" />
      </template>

      <template #footer>
        <div v-if="column.tasks.length === 0 && !isAdding" class="empty-state">
          Arrasta algo para aqui ou cria uma tarefa.
        </div>
      </template>
    </draggable>

    <div class="footer-actions">
      <div v-if="isAdding" class="add-form">
        <input
          v-model="newTaskTitle"
          placeholder="Título da tarefa..."
          class="task-input"
          @keyup.enter="addTask"
          auto-focus
        />

        <textarea
          v-model="newTaskDescription"
          placeholder="Adicionar descrição..."
          class="task-textarea"
          rows="2"
        ></textarea>

        <select v-model="newTaskPriority" class="input select-priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div class="form-buttons">
          <button class="btn-confirm" @click="addTask">Adicionar</button>
          <button class="btn-cancel" @click="isAdding = false">Cancelar</button>
        </div>
      </div>
      <button v-else class="btn-show-add" @click="isAdding = true">+ Nova Tarefa</button>
    </div>
  </section>
</template>

<style scoped>
.column {
  flex: 1;
  min-width: 0;
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid #1e293b;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.column-header {
  padding: 16px;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.column-title {
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
  margin: 0;
}

.badge {
  font-size: 11px;
  background-color: #1e293b;
  padding: 2px 8px;
  border-radius: 4px;
  color: #64748b;
}

.task-list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100px;
}

.empty-state {
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #475569;
  border: 2px dashed #1e293b;
  border-radius: 8px;
  margin: 10px;
}

.footer-actions {
  padding: 12px;
}

.btn-show-add {
  width: 100%;
  padding: 8px;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  text-align: left;
  border-radius: 6px;
}

.btn-show-add:hover {
  background: #1e293b;
  color: #f8fafc;
}

.task-input {
  width: 100%;
  background: #0f172a;
  border: 1px solid #3b82f6;
  border-radius: 6px;
  padding: 8px;
  color: white;
  font-size: 14px;
  margin-bottom: 8px;
  outline: none;
}

.task-textarea {
  width: 100%;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 8px;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 8px;
  resize: none;
  outline: none;
}

.task-textarea:focus {
  border-color: #3b82f6;
}

.form-buttons {
  display: flex;
  gap: 8px;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.btn-cancel {
  background: transparent;
  color: #94a3b8;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.ghost-card {
  opacity: 0.5;
  background: #3b82f6;
  border-radius: 8px;
}

.select-priority {
  width: 100%;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 8px;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 8px;
  outline: none;
  cursor: pointer;
}

.select-priority:focus {
  border-color: #3b82f6;
}

.select-priority option {
  background-color: #0f172a;
  color: white;
}
</style>
