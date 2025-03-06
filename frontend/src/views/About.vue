<!-- src/views/About.vue -->
<template>
  <v-app style="background-color: black">
    <v-main>
      <v-container>
        <h1>About Page</h1>
        <p>This is the About Page.</p>
      </v-container>
      <div class="flex">
        <CollapListVue
          title="Category Type"
          :items="['Cloths', 'Shoes', 'Phones']"
        />
        <CollapListVue
          title="Brands"
          :items="['Louis Vuitton', 'Nike', 'IPhone']"
        />
      </div>
      <v-btn color="primary" @click="HandleRetrieve">Retrieve Data</v-btn>

      <hr />
      <hr />
      <hr />
      <ListItem />
      <ListItem v-for="(obj, index) in Data" :key="index" :item="obj" />
    </v-main>

    <v-snackbar v-model="show" timeout="3000">
      Data Retrieved!
      <template v-slot:actions>
        <v-btn color="red" @click="show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import ListItem from "../components/ListItem.vue";

import { openDB } from "idb";
import CollapListVue from "../components/CollapList.vue";

export default {
  components: {
    CollapListVue,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    async HandleRetrieve() {
      this.show = true;
      console.log("Retrieving data...");
      const data = await this.getData();
      console.log(data);
    },

    async getData() {
      const db = await openDB("myDatabase", 2);

      if (!db.objectStoreNames.contains("categories")) {
        console.error("Object store 'categories' not found!");
        return;
      }

      const tx = db.transaction("categories", "readonly");
      const store = tx.objectStore("categories");

      const allData = await store.getAll(); // 🔥 Retrieves all stored data
      console.log("Retrieved Data:", allData);

      return allData; // Return data to use in other components
    },
  },
};
</script>
