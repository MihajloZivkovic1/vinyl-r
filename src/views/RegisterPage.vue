<template>
    <div>
        <form @submit.prevent="registerUser">
            <custom-input v-model="user.username" label="Korisničko ime" placeholder="Unesite korisničko ime" />
            <custom-input v-model="user.email" label="Email adresa" placeholder="Unesite email adresu" />
            <custom-input v-model="user.password" label="Lozinka" type="password" placeholder="Unesite lozinku" />
            <button type="submit">Registracija</button>
        </form>
        <div v-if="registrationSuccess" class="success-message">Registration succesfull!</div>
        <div v-if="registrationError" class="error-message">{{ registrationError }}</div>
    </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import store from '@/store/store'

export default{
    store,
    components:{
        'custom-input':CustomInput,

    },
    data(){
        return{
            user:{
                username:"",
                email:"",
                password:""
            },
            registrationError:null,
            registrationSuccess:false
        }
    },
    methods:{
        async registerUser(){
            try{
                await this.$store.dispatch('registerUser',this.user);

                this.registrationSuccess = true;
                this.registrationError = null
            }
            catch(error){
                this.registrationSuccess = false
                this.registrationError = error.message
            }
        }
    }
}
</script>
<style>
form{
    margin-top: 50px;
}
</style>>

