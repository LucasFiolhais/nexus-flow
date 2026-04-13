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
          placeholder="Título da tarefa"
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
            <button class="btn-add" @click="addSubtask">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.modal-card {
  background: #1e293b;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  border: 1px solid #334155;
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-content {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title-input {
  background: transparent;
  border: none;
  font-size: 22px;
  font-weight: 800;
  color: #f8fafc;
  width: 100%;
  outline: none;
  padding-bottom: 8px;
  border-bottom: 2px solid #334155;
  margin-top: 10px;
}

.title-input:focus {
  border-bottom-color: #3b82f6;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-size: 11px;
  color: #60a5fa;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

textarea {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 14px;
  color: #cbd5e1;
  min-height: 100px;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  width: 100%;
  resize: none;
  white-space: pre-wrap;
}

.subtask-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #0f172a;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 1px solid #1e293b;
}

.subtask-item input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}

.add-subtask-group {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.add-subtask-group input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #334155;
  padding: 12px;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  outline: none;
}

.btn-add {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 10px;
  font-weight: 700;
}

.close-top {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #334155;
  border: none;
  color: #f8fafc;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
}

.btn-del-sub {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 20px;
  padding: 5px;
}
</style>
