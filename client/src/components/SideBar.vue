<script setup lang="ts">

const props = defineProps<{
    width?: number
}>()
</script>

<template>
    <div class="side-bar" :class="{ 'is-active': false }" :style="{ width: props.width + 'px' }">
        <slot />
    </div>
</template>

<style scoped>
.side-bar {
    width: 250px;
    position: fixed;
    top: 56px;
    /* Adjust based on your header height */
    right: 0;
    height: calc(100% - 56px);
    border-left: 1px solid #ddd;
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);
    transform: translateX(90%);
    transition: transform 0.3s ease-in-out;
}

.side-bar:hover,
.side-bar.is-active {
    transform: translateX(0);
}
</style>