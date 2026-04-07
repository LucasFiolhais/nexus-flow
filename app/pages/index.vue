<script setup lang="ts"></script>

<template>
  <div class="hero-container">
    <div class="hero-content">
      <h1 class="hero-title">
        Faz a tua produtividade <br />
        <span class="accent">Fluir</span>
      </h1>

      <p class="hero-text">Organiza as tuas tarefas e alcança os teus objetivos com o Nexus Flow</p>

      <NuxtLink to="/board" class="btn-start"> Começar Agora </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65vh;
  padding: 0 20px;
  text-align: center;
}

.hero-content {
  max-width: 700px;
}

.hero-title {
  font-size: clamp(36px, 8vw, 72px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -3px;
  margin-bottom: 20px;
  color: #f8fafc;
  text-transform: uppercase;
}

.accent {
  background: linear-gradient(90deg, #60a5fa 0%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-text {
  font-size: clamp(16px, 2vw, 20px);
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 40px;
  font-weight: 500;
}

.btn-start {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 18px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
}

.btn-start:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
}

.btn-start:active {
  transform: translateY(0);
}
</style>
