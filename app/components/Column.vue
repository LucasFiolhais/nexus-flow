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
    const targetCol = taskStore.columns.find((c) => c.title === props.column.title)
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
          placeholder="Título..."
          class="task-input"
          @keyup.enter="addTask"
          auto-focus
        />
        <textarea
          v-model="newTaskDescription"
          placeholder="Descrição..."
          class="task-textarea"
          rows="2"
        ></textarea>

        <label class="input-label">Data Limite (Opcional)</label>
        <input v-model="newTaskDueDate" type="date" class="task-date-input" />

        <select v-model="newTaskPriority" class="select-priority">
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
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
  flex: 1 1 300px;
  min-width: 300px;
  max-width: 450px;
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
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
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
  flex: 1;
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
  padding: 10px;
  background: transparent;
  border: 1px dashed #334155;
  color: #94a3b8;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
}
.add-form {
  background: #1e293b;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.task-input,
.task-textarea,
.task-date-input,
.select-priority {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 8px;
  color: white;
  font-size: 14px;
  outline: none;
}
.task-date-input {
  color-scheme: dark;
}
.input-label {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
}
.form-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.btn-confirm {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
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
  opacity: 0.4;
  background: #3b82f6 !important;
}
</style>
