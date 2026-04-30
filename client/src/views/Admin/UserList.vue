<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { RouterLink } from 'vue-router';
import type { User } from '../../../../server/types';
import { confirm } from '@/components/DialogBoxes.vue';
import PaginationControls from '@/components/PaginationControls.vue';
import { ref } from 'vue';
import type { PagingRequest } from '../../../../server/types/dataEnvelopes';
import { watchDebounced } from '@vueuse/core';

const users = useUsersStore()
const pagination = ref<PagingRequest>({ page: 1, pageSize: 10 })
if (!users.totalCount) {
    users.loadUsers(pagination.value)
}

watchDebounced(pagination, (newPagination) => {
    users.loadUsers(newPagination)
}, { debounce: 500, deep: true })

async function remove(user: User) {
    if (!user.id) {
        console.error('User ID is missing, cannot delete user.')
        return
    }
    if (await confirm("Delete", `Are you sure that you want to delete ${user.firstName} ${user.lastName}?`)) {
        users.deleteUser(user.id)
    }
}
</script>

<template>
    <div id="admin-user-list">
        <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>
                        <div class="control has-icons-left" style="display: inline-block; margin-right: 1em;">

                            <input type="text" class="input is-rounded is-small" placeholder="Search..."
                                   v-model="pagination.search">
                            <span class="icon is-small is-left">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>


                        <RouterLink to="/admin/users/edit" class="button is-small is-primary">
                            <span>New</span>
                            <span class="icon">
                                <i class="fas fa-plus"></i>
                            </span>
                        </RouterLink>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users.users" :key="user.id">
                    <td>
                        <img :src="user.image" alt="User Avatar" class="image is-32x32 is-rounded">
                    </td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <RouterLink :to="`/admin/users/edit/${user.id}`" class="button is-small is-warning">
                            <span class="icon">
                                <i class="fas fa-edit"></i>
                            </span>
                        </RouterLink>
                        <button class="button is-small is-danger" @click="remove(user)">
                            <span class="icon">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <PaginationControls v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize"
                            :total-pages="Math.ceil((users.totalCount ?? 1) / (pagination.pageSize ?? 1))" />
    </div>
</template>

<style scoped>
.table {
    margin-bottom: 0;
}
</style>