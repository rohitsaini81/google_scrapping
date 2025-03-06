<script setup>
import { RouterLink, RouterView } from "vue-router";
import "./Utils.css";
</script>

<template>
  <div class="parent flex coulmn body-size">
    <nav class="flex nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">Saved Inventory</RouterLink>
    </nav>
    <RouterView />
    <!-- retrieve -->
  </div>
</template>

<style scoped>
.nav {
  width: 100%;
  justify-content: space-between;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
