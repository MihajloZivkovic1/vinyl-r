<template>
  <div class="contact-form">
    <CustomInput v-model="name" label="Name" placeholder="Enter your name" />
    <CustomInput v-model="email" label="Email" type="email" placeholder="Enter your email" />
    <CustomInput v-model="subject" label="Subject" placeholder="Enter the subject" />
    <CustomInput v-model="message" label="Message" type="textarea" placeholder="Enter your message" />
    <div id="msg" class="poruka">{{poruka}}</div>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import axios from 'axios';
import { mapMutations } from 'vuex';
import store  from '@/store/store';
export default {
  store,
  components: {
    CustomInput
  },
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      poruka:''
    };
  },
  methods: {
    ...mapMutations(['addMessage']),
    async submitForm() {

      const formData = {
        id:null,
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
        
      };
      try{
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts',formData)
        console.log('Reposnse from server', response.data)
        this.poruka = 'Your message is sent'
        this.$store.commit('addMessage',formData)
      }
      catch (error){
        console.error('Error sending data',error);
        this.poruka = 'Error sending message';
      }


      console.log('Form submitted:', formData);

     
    }
  }
};
</script>
<style scoped>
.contact-form {
  max-width: 500px;
  margin: 90px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: #0056b3;
}

</style>