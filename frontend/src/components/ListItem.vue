<template>
  <li>
    <div class="image" v-if="item.image">
      <img :src="item.image" />
    </div>
    <!-- <img v-else :src="import from/assets/box.png'" /> -->

    <div class="cart-item-content">
      <p>Product {{ item.title }}</p>
      <p class="price">{{ item.price }}</p>
      <!-- <p class="description">Short description here</p> -->
    </div>
  </li>
</template>

<style scoped>
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
import image from "../assets/box.png";
export default {
  props: {
    item: Object,
    type: Object,
    image: Object,
    // required: true,
  },
  methods: {
    test() {
      console.log(this.props.image);
    },
  },
  data() {
    return {
      defaultImage: image,
    };
  },
};
// this.test()
</script>
