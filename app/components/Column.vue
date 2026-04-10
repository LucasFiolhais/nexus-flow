<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Task, Column } from '~/types/kanban'
import { useTaskStore } from '~/stores/taskStore'

const props = defineProps<{
  column: Column
}>()

const taskStore = useTaskStore()

const tasks = computed({
  get: () => props.column.tasks,
  set: (newList) => {
    const targetCol = taskStore.columns.find(
      (c) => c.title.toUpperCase() === props.column.title.toUpperCase()
    )
    if (targetCol) {
      targetCol.tasks = newList
    }
  }
})

const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskPriority = ref<'low' | 'medium' | 'high'>('medium')
const newTaskDueDate = ref('')
const isAdding = ref(false)

const isDraggable = computed(() => {
  return taskStore.searchQuery === '' && taskStore.filterPriority === 'all'
})

const addTask = () => {
  if (!newTaskTitle.value.trim()) return

  const newTask: Task = {
    id: Date.now(),
    title: newTaskTitle.value,
    description: newTaskDescription.value.trim() || 'Sem descrição',
    priority: newTaskPriority.value,
    createdAt: new Date().toISOString(),
    subtasks: []
  }

  if (newTaskDueDate.value) {
    newTask.dueDate = newTaskDueDate.value
  }

  taskStore.addTaskToColumn(props.column.title, newTask)

  newTaskTitle.value = ''
  newTaskDescription.value = ''
  newTaskPriority.value = 'medium'
  newTaskDueDate.value = ''
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
      v-model="tasks"
      group="tasks"
      item-key="id"
      class="task-list"
      ghost-class="ghost-card"
      :disabled="!isDraggable"
      :delay="200"
      :touch-start-threshold="5"
    >
      <template #item="{ element }">
        <Card :task="element" />
      </template>

      <template #footer>
        <div v-if="column.tasks.length === 0 && !isAdding" class="empty-state">
          {{ isDraggable ? 'Arrasta algo para aqui ou cria uma tarefa.' : 'Nenhum resultado.' }}
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
          v-focus
        />
        <textarea
          v-model="newTaskDescription"
          placeholder="Descrição opcional..."
          class="task-textarea"
          rows="2"
        ></textarea>

        <label class="input-label">Prazo</label>
        <input v-model="newTaskDueDate" type="date" class="task-date-input" />

        <label class="input-label">Prioridade</label>
        <select v-model="newTaskPriority" class="select-priority">
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>

        <div class="form-buttons">
          <button class="btn-confirm" @click="addTask">Guardar</button>
          <button class="btn-cancel" @click="isAdding = false">Cancelar</button>
        </div>
      </div>
      <button v-else class="btn-show-add" @click="isAdding = true">
        <span class="plus">+</span> Nova Tarefa
      </button>
    </div>
  </section>
</template>

<style scoped>
.column {
  flex: 1 1 320px;
  min-width: 320px;
  max-width: 400px;
  background-color: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  transition: all 0.3s ease;
}

@media (max-width: 640px) {
  .column {
    min-width: 100%;
    max-width: 100%;
    max-height: none;
  }
}

.column-header {
  padding: 18px;
  border-bottom: 1px solid #1e293b;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.column-title {
  font-size: 13px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge {
  font-size: 11px;
  background-color: #1e293b;
  padding: 2px 8px;
  border-radius: 6px;
  color: #94a3b8;
  font-weight: 700;
}

.task-list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100px;
  flex: 1;
  overflow-y: auto;
}

.empty-state {
  padding: 30px 20px;
  text-align: center;
  font-size: 12px;
  color: #475569;
  border: 2px dashed #1e293b;
  border-radius: 12px;
  margin: 10px;
}

.footer-actions {
  padding: 12px;
}

.btn-show-add {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px dashed #334155;
  color: #94a3b8;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  transition: 0.2s;
}

.btn-show-add:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.add-form {
  background: #1e293b;
  padding: 14px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.task-input,
.task-textarea,
.task-date-input,
.select-priority {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 10px;
  color: #f8fafc;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.task-input:focus,
.task-textarea:focus {
  border-color: #3b82f6;
}

.input-label {
  font-size: 10px;
  color: #64748b;
  font-weight: 800;
  text-transform: uppercase;
  margin-top: 4px;
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}

.btn-cancel {
  background: transparent;
  color: #94a3b8;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.ghost-card {
  opacity: 0.2;
  background: #3b82f6 !important;
  border: 2px solid #3b82f6;
}

.task-list::-webkit-scrollbar {
  width: 5px;
}
.task-list::-webkit-scrollbar-track {
  background: transparent;
}
.task-list::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
</style>
