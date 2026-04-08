<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'
import { ref } from 'vue'

const taskStore = useTaskStore()
const newSubtaskTitle = ref('')

const closeModal = () => taskStore.selectTask(null)

const addSubtask = () => {
  if (!newSubtaskTitle.value.trim() || !taskStore.selectedTask) return

  const sub: any = {
    id: Date.now(),
    title: newSubtaskTitle.value,
    isDone: false
  }

  taskStore.selectedTask.subtasks.push(sub)
  taskStore.updateTask(taskStore.selectedTask)
  newSubtaskTitle.value = ''
}

const toggleSubtask = () => {
  if (taskStore.selectedTask) taskStore.updateTask(taskStore.selectedTask)
}

const deleteSubtask = (id: number) => {
  if (!taskStore.selectedTask) return
  taskStore.selectedTask.subtasks = taskStore.selectedTask.subtasks.filter((s) => s.id !== id)
  taskStore.updateTask(taskStore.selectedTask)
}
</script>

<template>
  <div v-if="taskStore.selectedTask" class="modal-overlay" @click.self="closeModal">
    <div class="modal-card">
      <button class="close-top" @click="closeModal">&times;</button>

      <div class="modal-content">
        <input
          v-model="taskStore.selectedTask.title"
          class="title-input"
          @blur="taskStore.updateTask(taskStore.selectedTask!)"
        />

        <div class="section">
          <label>Descrição</label>
          <textarea
            v-model="taskStore.selectedTask.description"
            placeholder="Adiciona detalhes a esta tarefa..."
            @blur="taskStore.updateTask(taskStore.selectedTask!)"
          ></textarea>
        </div>

        <div class="section">
          <label>Sub-tarefas</label>
          <div class="subtask-list">
            <div v-for="sub in taskStore.selectedTask.subtasks" :key="sub.id" class="subtask-item">
              <input type="checkbox" v-model="sub.isDone" @change="toggleSubtask" />
              <span :class="{ 'is-done': sub.isDone }">{{ sub.title }}</span>
              <button @click="deleteSubtask(sub.id)" class="btn-del-sub">&times;</button>
            </div>
          </div>
          <div class="add-subtask-group">
            <input
              v-model="newSubtaskTitle"
              placeholder="Nova sub-tarefa..."
              @keyup.enter="addSubtask"
            />
            <button @click="addSubtask">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
}
.modal-card {
  background: #0f172a;
  width: 90%;
  max-width: 600px;
  border-radius: 16px;
  border: 1px solid #334155;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.title-input {
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: 800;
  color: white;
  width: 100%;
  outline: none;
  border-bottom: 2px solid transparent;
  transition: 0.2s;
}
.title-input:focus {
  border-bottom-color: #3b82f6;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-size: 12px;
  color: #60a5fa;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}
textarea {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
  color: #cbd5e1;
  min-height: 120px;
  font-family: inherit;
  outline: none;
}
textarea:focus {
  border-color: #3b82f6;
}
.subtask-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1e293b;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 4px;
}
.is-done {
  text-decoration: line-through;
  color: #64748b;
}
.add-subtask-group {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.add-subtask-group input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #334155;
  padding: 8px;
  border-radius: 6px;
  color: white;
}
.close-top {
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 30px;
  cursor: pointer;
}
.btn-del-sub {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
}
</style>
