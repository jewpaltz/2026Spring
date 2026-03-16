<script setup lang="ts">
import { useProductsStore } from '@/stores/products';
import SideBar from '@/components/SideBar.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import { useCartStore } from '@/stores/cart';


const products = useProductsStore()
const cart = useCartStore()

function addToCart(productId: number) {
    cart.addItem(productId)
}

</script>

<template>
    <h1 class="title is-1">Product List</h1>
    <div class="grid is-col-min-10">
        <div v-for="product in products.products" :key="product.id" class="box">
            <img :src="product.thumbnail" alt="Product Image" class="image is-4by3">

            <h4 class="title is-6">{{ product.title }}</h4>
            <h6 class="subtitle is-6">{{ product.category }} / {{ product.brand }}</h6>
            {{ product.description }}
            <button class="button is-primary is-small add-button" @click="addToCart(product.id)">
                Add to Cart
            </button>
            <div>
                <span class="price">${{ product.price }}</span>
            </div>
        </div>
    </div>
    <SideBar :width="300" :is-active="cart.isCartSidebarOpen" class="sidebar">
        <ShoppingCart />
    </SideBar>
</template>

<style scoped>
.sidebar {
    background-color: #fff;
}

.subtitle {
    margin-bottom: .5em;
    font-style: italic;
}

.add-button {
    float: right;
    margin-top: .5em;
    ;
}

.price {
    font-weight: bold;
    color: #3273dc;
}
</style>