<!-- src/views/Home.vue -->
<template>
  <div class="parent flex coulmn">
    <h1>Home Page</h1>

    <p>Welcome to the Home Page!</p>

    <div class="parent container inline-center flex">
      <div class="container half">
        <div class="inputes flex coulmn">
          <div class="input">
            <label for="title">Category Type</label
            ><input
              name="title"
              type="text"
              v-model="Title"
              placeholder="Enter Category Type"
            />
            <!-- <p>You typed: {{ Name }}</p> -->
          </div>
          <div class="input">
            <label for="title">Price Range</label>
            <!-- <input name="pricefrom" type="range" /> -->
            <v-slider
              id="input"
              v-model="sliderValue"
              min="100"
              max="10000"
              step="1"
              thumb-label
            ></v-slider>
          </div>
          <div class="input">
            <label for="title">Brand Name</label
            ><input name="title" type="text" v-model="Brand" />
          </div>
          <div class="input">
            <label for="title">Location by Country</label
            ><input name="title" type="text" v-model="Country" />
          </div>
        </div>

        <div class="actionContainer flex">
          <div class="actions button">
            <button @click="handleFetch">Get all Data</button>
          </div>
          <div class="actions button">
            <button @click="handleSave">Save all Data</button>
          </div>
        </div>
      </div>
      <div class="container half">
        <ul ref="ListItems" class="scroll-y">
          <!-- <ListItem /> -->
          <!-- <ListItem v-for="(obj, index) in Data" :key="index" /> -->
          <ListItem v-for="(obj, index) in Data" :key="index" :item="obj" />
        </ul>
      </div>
    </div>

    <v-snackbar v-model="show" timeout="3000">
      LOADING... !
      <template v-slot:actions>
        <v-btn color="red" @click="show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
/* .v-input{
  display: flex;
  justify-content: end;
  width: 11rem;
} */
.parent {
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
img {
  margin-right: 10px;
}
.cart-item-content {
  display: flex;
  flex-direction: column;
  width: 16rem;
}
.cart-item-content p {
  margin: 2px 0;
}
.price {
  font-weight: bold;
  color: green;
}
.description {
  font-size: 0.9em;
  color: #666;
}
</style>

<script>
import ListItem from "../components/ListItem.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { openDB } from "idb";

const ListItems = ref(null);
export default {
  components: {
    ListItem,
  },

 methods: {
  async _Fetch() {
    // console.log(this.Title);
    // console.log(this.Brand);
    // console.log(this.sliderValue);
    // console.log(this.Country);
    
    try {
      if (ListItems.value != null && ListItems.value.children.length > 0) {
        console.log("SOMETHING WENT WRONG");
        return;
      }
      if (this.Title === "") {
        console.log("Please enter category type");
        return;
      }

      const res = await axios.get(`http://localhost:4000/scrape/${this.Title}`);
      this.Data = res.data._data;
      
      // Save data in IndexedDB
      await this.saveData(this.Data, this.Title);

    } catch (e) {
      console.log("Error:", e);
    }

    this.Title = "";
    this.Brand = "";
    this.sliderValue = "";
    this.Country = "";
  },

async saveData(Data, Title) {
  console.log("Saving Data:", Data);

  // ✅ Convert Vue Proxy to plain object (deep copy)
  const plainData = JSON.parse(JSON.stringify(Data));

  const db = await openDB("myDatabase", 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("categories")) {
        console.log("Creating object store: categories");
        db.createObjectStore("categories", { keyPath: "id", autoIncrement: true });
      }
    },
  });

  if (!db.objectStoreNames.contains("categories")) {
    console.error("Object store 'categories' not found!");
    return;
  }

  const tx = db.transaction("categories", "readwrite");
  const store = tx.objectStore("categories");

  await store.add({ title: Title, data: plainData });

  console.log("Data saved in IndexedDB:", plainData);
},



    handleFetch() {
      this._Fetch();
      this.show = true;
    },
    handleSave() {
      this.saveData();
      this.show = true;
    },
  },
  data() {
    return {
      sliderValue: 500,
      Title: "",
      Brand: "",
      Country: "",
      Data: [],
      show: false,
    };
  },
  components: { ListItem },
};
</script>
