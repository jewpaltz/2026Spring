<script setup lang="ts">
import { useProductsStore } from '@/stores/products';
import { RouterLink } from 'vue-router';
import type { Product } from '../../../../server/types';
import { confirm } from '@/components/DialogBoxes.vue';

const products = useProductsStore()
products.loadProducts()

async function remove(product: Product) {
    if (await confirm("Delete", `Are you sure that you want to delete ${product.title}`)) {
        products.deleteProduct(product.id)
    }
}
</script>

<template>
    <div id="admin-product-list">
        <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Tags</th>
                    <th>Description</th>
                    <th>
                        <RouterLink to="/admin/products/edit" class="button is-small is-primary">
                            <span>New</span>
                            <span class="icon">
                                <i class="fas fa-plus"></i>
                            </span>
                        </RouterLink>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products.products" :key="product.id">
                    <td>
                        <img :src="product.thumbnail" alt="Product Image" class="image is-4by3">
                    </td>
                    <td>{{ product.title }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.brand }}</td>
                    <td>${{ product.price }}</td>
                    <td>
                        <div class="tags">
                            <span v-for="tag in product.tags" :key="tag" class="tag is-warning is-light">{{ tag
                                }}</span>
                        </div>

                    </td>
                    <td>{{ product.description }}</td>
                    <td>
                        <RouterLink :to="`/admin/products/edit/${product.id}`" class="button is-small is-warning">
                            <span class="icon">
                                <i class="fas fa-edit"></i>
                            </span>
                        </RouterLink>
                        <button class="button is-small is-danger" @click="remove(product)">
                            <span class="icon">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<style scoped></style>