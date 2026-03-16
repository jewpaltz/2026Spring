<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isActive = ref(false);
const cartStore = useCartStore();

function toggleCart() {
    console.log('Toggling cart sidebar');

    cartStore.isCartSidebarOpen = !cartStore.isCartSidebarOpen;
}
</script>

<template>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img alt="Vue logo" width="30" height="30" src="@/assets/logo.svg" />

                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                   @click="isActive = !isActive" :class="{ 'is-active': isActive }"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
                <div class="navbar-start">
                    <RouterLink to="/" active-class="is-active" class="navbar-item">
                        Home
                    </RouterLink>

                    <RouterLink to="/products" active-class="is-active" class="navbar-item">
                        Products
                    </RouterLink>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <RouterLink to="/about" active-class="is-active" class="navbar-item">
                                About
                            </RouterLink>
                            <RouterLink to="/contact" active-class="is-active" class="navbar-item">
                                Contact
                            </RouterLink>
                            <hr class="navbar-divider">
                            <RouterLink to="/report-issue" active-class="is-active" class="navbar-item">
                                Report an issue
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <a @click="toggleCart">
                            <span class="tag is-danger is-small is-rounded count" v-if="cartStore.count">
                                {{ cartStore.count }}
                            </span>
                            <span class="icon">
                                <i class="fas fa-shopping-cart"></i>
                            </span>
                        </a>

                    </div>
                    <div class="navbar-item">
                        <div class="buttons">
                            <RouterLink to="/sign-up" active-class="is-active" class="button is-primary">
                                <strong>Sign up</strong>
                            </RouterLink>
                            <RouterLink to="/log-in" active-class="is-active" class="button is-light">
                                Log in
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.count {
    position: absolute;
    top: -3px;
    right: -7px;
    font-size: 0.75rem;
    transition: all 0.3s ease-in-out;
}
</style>