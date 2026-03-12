<script setup lang="ts">
import { useProductsStore } from '@/stores/products';


const products = useProductsStore()

</script>

<template>
    <h1 class="title is-1">Product List</h1>
    <div class="grid is-col-min-10">
        <div v-for="product in products.products" :key="product.id" class="box">
            <img :src="product.thumbnail" alt="Product Image" class="image is-4by3">

            <h4 class="title is-6">{{ product.title }}</h4>
            <h6 class="subtitle is-6">{{ product.category }} / {{ product.brand }}</h6>
            {{ product.description }}
            <button class="button is-primary is-small add-button">
                Add to Cart
            </button>
            <div>
                <span class="price">${{ product.price }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
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