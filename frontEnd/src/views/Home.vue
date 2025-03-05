<!-- src/views/Home.vue -->
<template>
  <div class="parent flex coulmn">
    <h1>Home Page</h1>


  <!-- <button @click="showToast">Show Toast</button> -->


    <p>Welcome to the Home Page!</p>

    <div class="parent container inline-center flex">
      <div class="container half">
        <div class="inputes flex coulmn">
          <div class="input">
            <label for="title">Category Type</label
            ><input name="title" type="text" />
          </div>
          <div class="input">
            <label for="title">Price Range</label
            ><input name="pricefrom" type="range" />
          </div>
          <div class="input">
            <label for="title">Brand Name</label
            ><input name="title" type="text" />
          </div>
          <div class="input">
            <label for="title">Location by Country</label
            ><input name="title" type="text" />
          </div>
        </div>

        <div class="actionContainer flex">
          <div class="actions"><button>Get all Data</button></div>
          <div class="actions"><button>Save all Data</button></div>
        </div>
      </div>
      <div class="container half">
        <ul>
          <li>
            <div class="image"><img src="../assets/logo.jpg" alt="Product Logo" /></div>
            <div class="cart-item-content">
              <p>Product Title</p>
              <p class="price">$99.99</p>
              <p class="description">Short description here</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent {
  width: 100%;
}
</style>

// <script>
// import { useToast } from "vue-toastification";

// export default {
//   setup() {
//     const toast = useToast();
//     const showToast = () => {
//       toast.success("This is a toast message!", {
//         timeout: 3000,
//         position: "top-right",
//       });
//     };
//     return { showToast };
//   },
// };
// </script>