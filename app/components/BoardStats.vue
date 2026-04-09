<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'
const taskStore = useTaskStore()
</script>

<template>
  <div class="stats-container">
    <div class="stat-card">
      <span class="stat-value">{{ taskStore.stats.pending }}</span>
      <span class="stat-label">Tarefas Pendentes</span>
    </div>

    <div class="stat-card progress-card">
      <div class="progress-info">
        <span class="percentage">{{ taskStore.stats.percentage }}%</span>
        <span class="stat-label">Trabalho Concluído</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" :style="{ width: taskStore.stats.percentage + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
}

.stat-card {
  background: #1e293b;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #334155;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: #3b82f6;
}

.percentage {
  font-size: 28px;
  font-weight: 800;
  color: #10b981;
}

.stat-label {
  font-size: 12px;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.progress-card {
  flex: 2;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}

.progress-bar-bg {
  height: 8px;
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
