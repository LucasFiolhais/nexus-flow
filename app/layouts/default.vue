<script setup lang="ts"></script>

<template>
  <div class="layout">
    <header class="header">
      <div class="header-container">
        <img src="/logo.png" alt="Nexus Flow" class="logo" />
        <h1 class="brand">Nexus Flow</h1>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #0f172a;
  color: #f8fafc;
}

.header {
  height: 64px;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  background-color: #0f172a;
}

.header-container {
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 32px;
  height: 32px;
}

.brand {
  font-size: 20px;
  font-weight: 700;
  color: #60a5fa;
  margin: 0;
}

.main {
  padding: 24px;
}
</style>
