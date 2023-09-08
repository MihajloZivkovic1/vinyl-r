<!-- UserList.vue -->
<template>
    <div>
        <h1>Lista Korisnika</h1>
        <ul>
            <li v-for="user in users" :key="user.id">
                <router-link :to="'/playlist/' + user.id">{{ user.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import store from '@/store/store';
export default {
    store,
    computed: {
        users() {
            return this.$store.state.users;
        },
        playlist(){
            return this.$store.state.songs
        }
    },
};
</script>
