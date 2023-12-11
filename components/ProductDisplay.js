app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :class="{'out-of-stock-img': !inStock}" :src="image" />
      </div>
      <div class="product-info">
        <h1>{{ productPageTitle }}</h1>
        <p>{{ description }}</p>
        <p v-if="onSale">Sale!!</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{backgroundColor: variant.color}"
        ></div>
        <p>Shipping: {{ shipping }}</p>

        <button
          class="button"
          :class="{disabledButton: !inStock}"
          v-on:click="addToCart"
          :disabled="!inStock"
        >
          Add to Cart
        </button>
        <button class="button" v-on:click="removeItemFromCart">
          Remove from Cart
        </button>
      </div>
    </div>
   
    <review-form @review-submitted="addReview"></review-form>
    <review-list :reviews="reviews"></review-list>
  </div>
    `,
  data() {
    return {
      title: "Socks",
      description: "Great pair of socks",
      brand: "Smelly Cat",
      selectedVariant: 0,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeItemFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    productPageTitle() {
      return this.brand + " " + this.title;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }

      return "2.99";
    },
  },
});
