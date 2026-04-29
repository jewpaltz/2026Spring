<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';

import type { User } from '../../../../server/types';

const router = useRouter();
const route = useRoute();
const users = useUsersStore();
const userId = route.params.id as string;
const user = ref({} as User);

const genders = ['Male', 'Female', 'Other'];
const roles = ['Admin', 'User', 'Vendor'];

if (userId) {
    users.getUser(Number(userId)).then((data) => {
        user.value = data.data
    });
}

async function saveUser() {
    if (user.value.id) {
        await users.updateUser(user.value.id, user.value);
    } else {
        await users.createUser(user.value);
    }

    router.push('/admin/users');
}

</script>

<template>
    <form id="admin-user-edit" class="box" v-if="user" @submit.prevent="saveUser">
        <h1 class="title">{{ user.id ? 'Edit' : 'New' }} User</h1>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.firstName">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.lastName">
                    </div>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input" type="email" v-model="user.email">
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Role</label>
                    <div class="control">
                        <select class="input" v-model="user.role">
                            <option v-for="role in roles" :key="role" :value="role.toLowerCase()">{{ role }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Gender</label>
                    <div class="control">
                        <select class="input" v-model="user.gender">
                            <option v-for="gender in genders" :key="gender" :value="gender.toLowerCase()">{{ gender }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Birth Date</label>
                    <div class="control has-icons-left">
                        <span class="icon is-small is-left">📅</span>
                        <input class="input" type="date" v-model="user.birthDate">
                    </div>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Avatar URL</label>
            <div class="control">
                <input class="input" type="text" v-model="user.image">
            </div>
        </div>
        <div class="field">
            <label class="label">Phone Number</label>
            <div class="control has-icons-left">
                <span class="icon is-small is-left">📞</span>
                <input class="input" type="tel" v-model="user.phone">
            </div>
        </div>


        <div class="columns">
            <div class="column is-three-quarters">
                <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.address">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Country</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.country">
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">City</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.city">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">State</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.state">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">ZIP Code</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.postalCode">
                    </div>
                </div>
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