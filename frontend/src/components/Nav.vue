<script setup>
import { ref, computed } from "vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Setting from "../views/Setting.vue";
// import NotFound from './NotFound.vue'

const routes = {
  "/": Home,
  "/about": About,
  "/setting": Setting,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound;
});
</script>

<template>
  <a href="#/">Home</a>
  <a href="#/about">About</a>
  <a href="#/setting">Setting</a>
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
