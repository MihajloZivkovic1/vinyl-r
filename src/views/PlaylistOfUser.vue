<!-- Playlist.vue -->
<template>
    <div class="mt-5">
        <h1>Playlista Korisnika {{ userId }}</h1>
        <ul>
            <!-- <li v-for="song in userPlaylist" :key="song.id">
                {{ song.name }} - {{ song.artist }}
                <button @click="removeFromPlaylist(song.id)">Ukloni iz playliste</button>
            </li> -->
            <li v-for="song in returnedPlaylist" :key="song.id">
                {{ song.name }} - {{ song.artist }}
                <button @click="removeFromPlaylist(song.id)">Remove from playlist</button>
            </li>
        </ul>
    </div>
</template>

<script>
import store from '@/store/store';
export default {
    store,
    computed: {
        userId() {
            return this.$route.params.userId;
        },
        userPlaylist() {
            const user = this.$store.state.users.find(user => user.id === parseInt(this.userId));
            return user ? user.playlist : [];
        },
        returnedPlaylist(){
            return this.$store.state.songs
        }
    },
    methods: {
        removeFromPlaylist(songId) {
            this.$store.commit('removeFromPlaylist', { userId: parseInt(this.userId), songId });
        },
    },
};
</script>
