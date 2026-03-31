<script setup lang="ts">
import { type Task } from '~/types/kanban'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div class="card">
    <h3 class="card-title">{{ task.title }}</h3>
    <p class="card-description">{{ task.description }}</p>

    <footer class="card-footer">
      <span :class="['priority-badge', task.priority]">
        {{ task.priority }}
      </span>
      <span class="card-id">#{{ task.id }}</span>
    </footer>
  </div>
</template>

<style scoped>
.card {
  background-color: #1e293b;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 200ms ease-in-out;
  cursor: grab;
}

.card:hover {
  border-color: #3b82f6;
  background-color: #263349;
  transform: translateY(-2px);
}

.card:active {
  cursor: grabbing;
}

.card-title {
  font-size: 14px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
}

.card-description {
  font-size: 13px;
  color: #94a3b8;
  line-height: 18px;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.priority-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.low {
  background-color: #10b981;
  color: #ffffff;
}
.medium {
  background-color: #f59e0b;
  color: #ffffff;
}
.high {
  background-color: #ef4444;
  color: #ffffff;
}

.card-id {
  font-size: 10px;
  color: #475569;
  font-weight: 600;
}
</style>
