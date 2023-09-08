<template>
    <div class="mt-5">
        <h1>Lista Korisnika</h1>
        <ul>
            <li v-for="user in users" :key="user.id">
                <router-link :to="'/playlist/' + user.id">{{ user.username }}</router-link>
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
            // Koristite Vuex getter ili direktno pristupite listi korisnika iz store-a
            return this.$store.state.users;
        },
    },
};
</script>
