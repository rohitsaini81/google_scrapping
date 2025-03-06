<template>
  <li>
    <div class="image">
      <img :src=item.image alt="Product Logo" />
    </div>
    <div class="cart-item-content">
      <p>Product {{ item.title }}</p>
      <p class="price">{{item.price}}</p>
      <p class="description">Short description here</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    type: Object,
    required: true,
  },
};
</script>
