<template>
    <div class="adminPanel">
        <h1>Admin Panel</h1>
        <button @click="showAddUserForm = !showAddUserForm">Add user</button>

        <!-- Dodavanje novog korisnika -->
        <div v-if="showAddUserForm">
            <h2>Add new user</h2>
            <form @submit.prevent="addUser">
                <label for="username">Username:</label>
                <input v-model="newUser.username" type="text" id="username" required>

                <label for="email">Email:</label>
                <input v-model="newUser.email" type="email" id="email" required>

                <button type="submit">Submit</button>
            </form>
        </div>

        <!-- Prikaz postojećih korisnika -->
        <div>
            <h2>Users</h2>
            <ul>
                <li v-for="user in users2" :key="user.id">
                    {{ user.username }} - {{ user.email }}
                    <button @click="editUser(user)">Update</button>
                    <button @click="deleteUser(user.id)">Delete</button>
                </li>
            </ul>
        </div>
        <div v-if="editingUser">
        <h2>Edit User</h2>
            <form @submit.prevent="saveChanges">
            <label for="username">Username</label>
            <input v-model="editedUser.username" type="text" id="username">
            <label for="email">Email</label>
            <input v-model="editedUser.email" type="email" id="email">
            <button type="submit">Save</button>
            </form>
      </div>
        <div>
            <h2>Saved Songs from Users</h2>
            <ul>
                <li v-for="song in playlist" :key="song.id">
                    {{ song.name }} - {{ song.artist }}  
                </li>
            </ul>
        </div>
        <div>
          <h2>Messages</h2>
          <ul>
            <li v-for="message in messages" :key="message.id">
              {{ message.name }} - {{ message.email }}: {{ message.message }}
              <button @click="deleteMessages(message.id)">Delete</button>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAddUserForm: false,
            newUser: {
                username: '',
                email: '',
            },
            users: [], 
            users3: [
                { id: 1, username: 'User1', email: 'user1@example.com' },
                { id: 2, username: 'User2', email: 'user2@example.com' },
            ],
            editingUser: null,
            editedUser: {
                id: null,
                username: '',
                email: '',
            },
        };
    },
    methods: {
        addUser() {
            this.$store.dispatch('addUser', this.newUser);
            this.newUser = {
                username: '',
                email: '',
                id:''
            };
            this.showAddUserForm = false;
        },
        editUser(user) {
            this.editingUser = user;
            this.editedUser.id = user.id;
            this.editedUser.username = user.username;
            this.editedUser.email = user.email;
        },
         saveChanges() {

            this.$store.dispatch('editUser', this.editedUser);


            this.editingUser = null;
            this.editedUser = {
                id: null,
                username: '',
                email: '',
            };
        },
        deleteUser(userId) {
            this.$store.dispatch('deleteUser', userId);
        },
        deleteMessages(messageId){
            this.$store.commit('deleteMessages', messageId)
        }
    },
    computed: {

        users2() {
            return this.$store.state.users;
        },
        playlist(){
            return this.$store.state.songs
        },
        messages(){
            return this.$store.state.messages
        }
    },
};
</script>
<style>
.adminPanel{
    margin-top: 150px;
}
</style>