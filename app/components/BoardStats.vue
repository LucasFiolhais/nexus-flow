<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'
const taskStore = useTaskStore()
</script>

<template>
  <div class="stats-container">
    <div class="stat-card">
      <span class="stat-value text-blue">{{ taskStore.stats.pending }}</span>
      <span class="stat-label">Tarefas Pendentes</span>
    </div>

    <div class="stat-card progress-card">
      <div class="progress-info">
        <div class="percentage-group">
          <span class="percentage">{{ taskStore.stats.percentage }}%</span>
          <span class="stat-label">Trabalho Concluído</span>
        </div>
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
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;
}

.stat-card {
  flex: 1;
  background: #1e293b;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 8px;
}

.text-blue {
  color: #3b82f6;
}

.percentage {
  font-size: 32px;
  font-weight: 900;
  color: #10b981;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.progress-card {
  flex: 1.5;
}

.progress-info {
  margin-bottom: 12px;
}

.percentage-group {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.progress-bar-bg {
  height: 10px;
  background: #0f172a;
  border-radius: 20px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  transition: width 0.8s ease-out;
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
    gap: 12px;
  }

  .stat-card {
    flex: none;
    width: 100%;
    padding: 16px;
    min-height: auto;
  }

  .percentage-group {
    flex-direction: row;
    justify-content: flex-start;
  }

  .stat-value,
  .percentage {
    font-size: 28px;
  }
}
</style>
