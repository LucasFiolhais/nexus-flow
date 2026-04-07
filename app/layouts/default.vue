<script setup lang="ts"></script>

<template>
  <div class="layout">
    <nav class="navbar">
      <div class="nav-content">
        <NuxtLink to="/" class="brand-link">
          <div class="brand-wrapper">
            <img src="/logo.png" alt="Nexus Flow" class="logo" />
            <h1 class="brand">Nexus <span class="brand-accent">Flow</span></h1>
          </div>
        </NuxtLink>
      </div>
      <div class="nav-bottom-line"></div>
    </nav>

    <main class="main">
      <div class="content-container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #020617;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.navbar {
  width: 100%;
  background-color: #0f172a;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px 20px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.nav-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.brand-link {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
}

.brand-link:hover {
  opacity: 0.85;
}

.brand-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  text-align: center;
}

.logo {
  width: clamp(100px, 15vw, 150px);
  height: auto;
  aspect-ratio: 1/1;
  object-fit: contain;
  display: block;
  margin-top: -10px;
  margin-bottom: clamp(-35px, -3vw, -25px);
  transition: transform 0.3s ease;
}

.brand-link:hover .logo {
  transform: scale(1.03);
}

.brand {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 900;
  letter-spacing: -2px;
  margin: 0;
  color: #f8fafc;
  line-height: 0.8;
  text-transform: uppercase;
}

.brand-accent {
  background: linear-gradient(90deg, #60a5fa 0%, #2563eb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
}

.nav-bottom-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #1e293b 20%,
    #3b82f6 50%,
    #1e293b 80%,
    transparent 100%
  );
  opacity: 0.6;
}

.main {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: clamp(20px, 4vw, 40px) 16px;
  box-sizing: border-box;
}

.content-container {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
</style>
