<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import useSessionStore from './stores/session';
import MessageList from './components/MessageList.vue';
const sessionStore = useSessionStore();

</script>

<template>

  <NavBar />
  <div class="container">
    <progress class="progress is-primary" v-if="sessionStore.isLoading"></progress>
    <MessageList />
    <RouterView />
  </div>

</template>

<style scoped></style>
