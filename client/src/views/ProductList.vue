<script setup lang="ts">
import { useProductsStore } from '@/stores/products';


const products = useProductsStore()

</script>

<template>
    <h1 class="title is-1">Product List</h1>
    <div class="grid is-col-min-10">
        <div v-for="product in products.products" :key="product.id" class="box">
            <img :src="product.thumbnail" alt="Product Image" class="image is-4by3">
            <button class="button is-primary is-small add-button">
                Add to Cart
            </button>
            <b>{{ product.title }}</b>
            {{ product.description }}
            <div class="price">{{ product.price }}</div>
        </div>
    </div>
</template>

<style scoped>
.add-button {
    float: right;
    margin-top: .5em;
    ;
}
</style>