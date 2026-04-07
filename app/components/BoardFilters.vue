<script setup lang="ts">
const taskStore = useTaskStore()
</script>

<template>
  <div class="filters-container">
    <div class="search-group">
      <span class="search-icon">🔍</span>
      <input
        v-model="taskStore.searchQuery"
        type="text"
        placeholder="Pesquisar por título..."
        class="filter-input search"
      />
    </div>

    <div class="select-group">
      <select v-model="taskStore.filterPriority" class="filter-input select">
        <option value="all">Todas as Prioridades</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.filters-container {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 0 4px;
}

.search-group {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.5;
}

.filter-input {
  background: #1e293b;
  border: 1px solid #334155;
  color: #f8fafc;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
  width: 100%;
}

.search {
  padding-left: 36px;
}

.select {
  width: 180px;
  cursor: pointer;
}

.filter-input:focus {
  border-color: #3b82f6;
  background: #0f172a;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.select option {
  background: #1e293b;
  color: white;
}
</style>
