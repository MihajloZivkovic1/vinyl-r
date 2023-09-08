// import Vue from 'vue';
// import Vuex from 'vuex';


// Vue.use(Vuex);

// export default new Vuex.Store({
//     state: {
//         loggedInUser: null,
//         users: []

//     },
//     mutations: {
//         setLoggedInUser(state, user) {
//             state.loggedInUser = user;
//         },
//         clearLoggedInUser(state) {
//             state.loggedInUser = null;
//         },
//         setData(state, playload) {
//             state.data = playload
//         },
//         addUser(state, user) {
//             state.users.push(user)
//         }
//     },
//     actions: {
//         login({ commit }, user) {
//             commit('setLoggedInUser', user);
//         },
//         logout({ commit }) {
//             commit('clearLoggedInUser');
//         },

//     },
// });
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [
            {
                username: "pera",
                password: "sifra1",
                role: "admin",
                id: 1,
                playlist: []

            },
            {
                username: "mika",
                password: "sifra1",
                role: "user",
                id: 2,
                playlist: []
            },
            {
                username: "zika",
                password: "sifra1",
                role: "moderator",
                id: 3,
                playlist: []
            }
        ],
        songs: [],
        playlist: [],
        messages: [],
        messageIdCounter: 1,

    },
    mutations: {
        addUser(state, user) {
            state.users.push(user)
        },
        editUser(state, editedUser) {
            const userIndex = state.users.findIndex(user => user.id === editedUser.id);
            if (userIndex !== -1) {

                state.users[userIndex] = editedUser;
            }
        },
        deleteUser(state, userId) {
            state.users = state.users.filter(user => user.id !== userId);
        },
        addSong(state, song) {
            state.songs.push(song)

        },
        createPlaylist(state, song) {
            state.playlist.push(song)
        },
        addToPlaylist(state, { userId, song }) {
            const user = state.users.find(user => user.id === userId);
            if (user) {
                user.playlist.push(song);
            }
        },
        removeFromPlaylist(state, { userId, songId }) {
            const user = state.users.find(user => user.id === userId);
            if (user) {
                user.playlist = user.playlist.filter(song => song.id !== songId);
            }
        },
        setCurrentUser(state, userId) {
            state.currentUser = userId;
        },
        addMessage(state, message) {
            message.id = state.messageIdCounter++
            state.messages.push(message)
            console.log('message added to store', message)
        },
        deleteMessages(state, messageId) {
            console.log('Deleting message with ID:', messageId);
            const index = state.messages.findIndex(message => message.id === messageId)
            if (index !== -1) {
                state.messages.splice(index, 1)
                console.log('message deleted')
            }
            else {
                console.log('message not deleted')
            }
        }

    },
    actions: {
        registerUser({ commit }, user) {
            if (!user.username || !user.email || !user.password) {
                throw new Error('Please enter registration fields')
            }
            commit('addUser', user)
        },
        addUser({ commit }, user) {
            commit('addUser', user)
            const lsUsers = JSON.parse(localStorage.getItem('lsUser')) || []
            lsUsers.push(user)
            localStorage.setItem('lsUsr', JSON.stringify(lsUsers))
        },
        editUser({ commit }, editedUser) {
            // Pozovi mutaciju za uređivanje korisnika
            commit('editUser', editedUser);
        },
        deleteUser({ commit }, userId) {
            commit('deleteUser', userId);
        },
        createPlaylist({ commit }, song) {
            commit('createPlaylist', song)
        },
        addSongToStore({ commit }, song) {
            commit('addSong', song)
            const savedSongs = JSON.parse(localStorage.getItem('mySavedSongs')) || []
            savedSongs.push(song)
            localStorage.setItem('mySavedSongs', JSON.stringify(savedSongs))
        },
        addSongToPlaylist({ commit, state }, { userId, song }) {
            const user = state.users.find(user => user.id === userId);
            if (user) {
                commit('addToPlaylist', { user, song });
            }
        },
        setCurrentUser({ commit }, userId) {
            commit('setCurrentUser', userId);
        }


    }

})

