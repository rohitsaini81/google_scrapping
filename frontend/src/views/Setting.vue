<!-- src/views/About.vue -->
<template>
  <v-app>
    <v-main class="inline-center" style="width: 88vw">
      <v-container>
        <h1>Setting Page</h1>
        <p>This .</p>
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
      <br />
      <hr />
      <br />
      <hr />

      <div class="flex inline-center" v-if="Data.length">
        <div class="scroll-y">
          <ListItem
            v-for="(obj, index) in Data"
            :key="index"
            :item="obj"
            :image="obj[0]"
            class="c-pointer"
            @click="fetchItemsByCategory(obj.id - 1)"
          />
        </div>
        <div class="scroll-y">
          <ListItem v-for="(obj, index) in Items" :key="index" :item="obj" />
        </div>
        <!-- <p v-else>No data found.</p> -->
      </div>
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
    ListItem, // ✅ FIXED: Registered ListItem component
  },
  data() {
    return {
      show: false,
      Data: [], // ✅ FIXED: Ensure Data is an empty array initially
      Items: [],
    };
  },
  methods: {
    fetchItemsByCategory(cat_id) {
      console.log("yo you wassup bitch ", cat_id);
      this.Items = this.Data[cat_id].data;
    },
    async HandleRetrieve() {
      this.show = true;
      console.log("Retrieving data...");

      const data = await this.getData();
      if (data) {
        this.Data = data;
        console.log("this is : ", data[3]);
      } else {
        this.Data = []; // ✅ FIXED: Handle case when no data is found
      }

      console.log("Data Retrieved:", this.Data);
    },

    async getData() {
      try {
        const db = await openDB("myDatabase", 2);

        if (!db.objectStoreNames.contains("categories")) {
          console.error("Object store 'categories' not found!");
          return [];
        }

        const tx = db.transaction("categories", "readonly");
        const store = tx.objectStore("categories");

        const allData = await store.getAll(); // 🔥 Retrieves all stored data
        return allData || []; // ✅ FIXED: Return empty array if no data
      } catch (error) {
        console.error("Error retrieving data:", error);
        return [];
      }
    },
  },
};
</script>
