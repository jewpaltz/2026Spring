<script setup lang="ts">
import useSessionStore from '@/stores/session';
const sessionStore = useSessionStore();
</script>

<template>
    <div>
        <div class="left">
            <button class="button is-primary" @click="sessionStore.api('non-existent-endpoint')">404 Api</button>
            <button class="button is-primary" @click="sessionStore.api('products/7000')">Error Api</button>
        </div>
        <div class="message-list">
            <div v-for="(message, index) in sessionStore.messages" :key="index"
                 :class="`message is-small is-${message.type}`">
                <p class="message-body">
                    <button class="delete" @click="sessionStore.messages.splice(index, 1)"></button>
                    {{ message.text }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.delete {
    float: right;
}
</style>