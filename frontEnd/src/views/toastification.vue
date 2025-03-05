<!-- src/views/About.vue -->

<template>
  <v-app>
    <div>
      <h1>About Page</h1>
      <p>This is the About Page.</p>
      
    </div>
    <v-container>
      <v-btn @click="show = true">Show Snackbar</v-btn>
      <v-snackbar v-model="show" timeout="3000">
        This is a toast message!
        <template v-slot:actions>
          <v-btn color="red" @click="show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

