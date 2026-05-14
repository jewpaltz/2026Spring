<script setup lang="ts">
import { useProductsStore } from '@/stores/products';
import SideBar from '@/components/SideBar.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const page = ref(1)

const products = useProductsStore()
products.loadProducts()

useInfiniteScroll(
    window,
    async () => {
        page.value++
        await products.loadProducts({ page: page.value })
    },
    {
        distance: 200,
        canLoadMore: () => products.products.length < (products.totalCount ?? 0),
    }
)

const cart = useCartStore()

function addToCart(productId: number) {
    cart.addItem(productId)
}

</script>

<template>
    <h1 class="title is-1" style="position: fixed; margin-top: -.5em; background: white; width: 100%; z-index: 1;">
        Product List
        <small class="subtitle is-6">(Showing {{ products.products.length }} of {{ products.totalCount }}
            products)</small>
    </h1>
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

        <div v-if="products.isLoading" v-for="x in 3" :key="x" class="box">
            <img alt="Product Image" class="image is-4by3  is-skeleton" src="">

            <h4 class="title is-6 is-skeleton"></h4>
            <h6 class="subtitle is-6 is-skeleton"></h6>
            <p class="skeleton-lines"></p>
            <button class="button is-primary is-small add-button is-skeleton">
                Add to Cart
            </button>
            <div>
                $ <span class="price is-skeleton">0.00</span>
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