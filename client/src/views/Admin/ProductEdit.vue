<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products';

import type { Product } from '../../../../server/types';

const router = useRouter();
const route = useRoute();
const products = useProductsStore();
const productId = route.params.id as string;
const product = ref({} as Product);

if (productId) {
    products.getProduct(Number(productId)).then((data) => {
        product.value = data.data
    });
}

async function saveProduct() {
    if (product.value.id) {
        await products.updateProduct(product.value.id, product.value);
    } else {
        await products.createProduct(product.value);
    }

    router.push('/admin/products');
}

</script>

<template>
    <form id="admin-product-edit" class="box" v-if="product" @submit.prevent="saveProduct">
        <h1 class="title">{{ product.id ? 'Edit' : 'New' }} Product</h1>
        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input class="input" type="text" v-model="product.title">
            </div>
        </div>
        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" v-model="product.description"></textarea>
            </div>
        </div>
        <div class="field">
            <label class="label">Price</label>
            <div class="control">
                <input class="input" type="number" step="0.01" v-model.number="product.price">
            </div>
        </div>
        <div class="field">
            <label class="label">Category</label>
            <div class="control">
                <input class="input" type="text" v-model="product.category">
            </div>
        </div>
        <div class="field">
            <label class="label">Brand</label>
            <div class="control">
                <input class="input" type="text" v-model="product.brand">
            </div>
        </div>
        <div class="field">
            <label class="label">Thumbnail URL</label>
            <div class="control">
                <input class="input" type="text" v-model="product.thumbnail">
            </div>
        </div>
        <div class="field">
            <label class="label">Tags (comma separated)</label>
            <div class="control">
                <input class="input" type="text" v-model="product.tags">
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link">Save</button>
            </div>
            <div class="control">
                <button class="button is-light">Cancel</button>
            </div>
        </div>

    </form>
</template>

<style scoped></style>