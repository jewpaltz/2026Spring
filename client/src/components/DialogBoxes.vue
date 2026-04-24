<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
let confirmData: any = null;
export function confirm(title: string, message: string, shouldFocus?: boolean) {
    confirmData.isOpen = true;
    confirmData.title = title;
    confirmData.message = message;
    confirmData.shouldFocus = shouldFocus;

    return new Promise((resolve, reject) => {
        confirmData.resolve = resolve;
        confirmData.reject = reject;
    });
}
</script>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">

import { reactive, ref, watch } from 'vue';

const btnYes = ref<HTMLFormElement | null>(null);
confirmData = reactive({
    isOpen: false,
    resolve: (x => null) as (value: any) => void,
    reject: (x => null) as (reason: any) => void,
    title: '',
    message: '',
    shouldFocus: undefined as boolean | undefined,
})
function yes() {
    confirmData.resolve(true);
    confirmData.isOpen = false;
}
function no() {
    confirmData.resolve(false);
    confirmData.isOpen = false;
}
watch(confirmData, (val) => {
    if (val.isOpen && val.shouldFocus) {
        btnYes.value?.focus()
    }
})
</script>

<template>

    <div class="modal is-active" v-if="confirmData.isOpen">
        <div class="modal-background" @click="confirmData.isOpen = false"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ confirmData.title }}</p>
                <button class="delete" aria-label="close" @click="confirmData.isOpen = false"></button>
            </header>
            <section class="modal-card-body">
                <p>{{ confirmData.message }}</p>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-success" @click="yes()">{{ confirmData.confirmText ?? 'Yes' }}</button>
                    <button class="button" @click="no()">{{ confirmData.cancelText ?? 'No' }}</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped></style>