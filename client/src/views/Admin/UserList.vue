<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { RouterLink } from 'vue-router';
import type { User } from '../../../../server/types';
import { confirm } from '@/components/DialogBoxes.vue';

const users = useUsersStore()
users.loadUsers()

async function remove(user: User) {
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

    </div>
</template>

<style scoped></style>