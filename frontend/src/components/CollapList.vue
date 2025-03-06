<!-- src/components/CollapList.vue -->
<template>
  <div class="collapsible c-pointer">
    <div class="title" @click="isOpen = !isOpen">
      {{ title }}
      <span>{{ isOpen ? "▲" : "▼" }}</span>
    </div>
    <ul v-if="isOpen">
      <li class="c-pointer" v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    items: Array,
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
