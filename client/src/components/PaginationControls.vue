<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    currentPage?: number;
    totalPages: number;
    pageSize?: number;
}>();
const current = computed(() => props.currentPage ?? 1);

const emit = defineEmits<{
    (e: 'update:currentPage', page: number): void;
    (e: 'update:pageSize', size: number): void;
}>();

function goTo(page: number) {
    if (page < 1 || page > props.totalPages) return;
    emit('update:currentPage', page);
}

// Build the list of page entries: numbers or 'ellipsis'
const pages = computed(() => {
    const total = props.totalPages;
    const result: (number | 'ellipsis')[] = [];

    if (total <= 7) {
        for (let i = 1; i <= total; i++) result.push(i);
        return result;
    }

    result.push(1);
    if (current.value > 3) result.push('ellipsis');
    for (let i = Math.max(2, current.value - 1); i <= Math.min(total - 1, current.value + 1); i++) {
        result.push(i);
    }
    if (current.value < total - 2) result.push('ellipsis');
    result.push(total);

    return result;
});
</script>

<template>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a href="#" class="pagination-previous" :class="{ 'is-disabled': current === 1 }"
           @click.prevent="goTo(current - 1)">Previous</a>
        <a href="#" class="pagination-next" :class="{ 'is-disabled': current === props.totalPages }"
           @click.prevent="goTo(current + 1)">Next page</a>
        <ul class="pagination-list">
            <template v-for="(page, i) in pages" :key="i">
                <li v-if="page === 'ellipsis'">
                    <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li v-else>
                    <a href="#" class="pagination-link"
                       :class="{ 'is-current': page === current }"
                       :aria-label="`Goto page ${page}`"
                       :aria-current="page === current ? 'page' : undefined"
                       @click.prevent="goTo(page)">{{ page }}</a>
                </li>
            </template>
        </ul>
        <div class="select" v-if="props.pageSize" style="order: 2;">
            <select :value="props.pageSize"
                    @change="emit('update:pageSize', Number(($event.target as HTMLSelectElement)?.value))">
                <option :value="5">5 per page</option>
                <option :value="10">10 per page</option>
                <option :value="20">20 per page</option>
                <option :value="50">50 per page</option>
            </select>
        </div>

    </nav>

</template>

<style scoped></style>