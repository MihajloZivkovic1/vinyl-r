<template>
    <div class="login-container">
        <h2>Logovanje</h2>
        <form>
            <div class="form-group">
                <label for="username">Korisničko ime</label>
                <input v-model="username" id="username" type="text" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password">Lozinka</label>
                <input v-model="password" id="password" type="password" class="form-control" />
            </div>
            <button @click="login" class="btn btn-primary">Uloguj se</button>
        </form>

    </div>
</template>

<script>


export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    computed:{
        loggedInUser(){
            const user = JSON.parse(localStorage.getItem('user'));
            return user ? user.username : null
        }
    },
    methods: {

        login() {
            const users = [
                {
                    username: 'pera',
                    password: 'sifra1',
                    role: 'admin',
                },
                {
                    username: 'mika',
                    password: 'sifra1',
                    role: 'user',
                },
                {
                    username: 'zika',
                    password: 'sifra1',
                    role: 'moderator',
                },
            ];
            const user = users.find(u => u.username === this.username && u.password === this.password)

            if(user){
                localStorage.setItem('user',JSON.stringify(user));
                this.$router.push({ name: user.role })
            }
            else{
                alert("wrong credentials");
            }
        },
        
    },
};
</script>
<style>

.login-container {
    width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-color: #fff;
    margin-top: 75px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.btn:hover {
    background-color: #0056b3;
}
</style>