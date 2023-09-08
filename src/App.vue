<template>
<div>
  <div class="container">
      <HeaderPage></HeaderPage>
         <NavBar/>
      <main>
        <RouterView></RouterView>
      </main>
      <FooterPage></FooterPage>
      
    </div>
</div>





</template>

<script>

import FooterPage from './components/FooterPage.vue'
import HeaderPage from './components/HeaderPage.vue';
import NavBar from './components/NavBar.vue';
// import axios from "axios"




export default {
  name: 'App',
  components:{
   
    NavBar,
    HeaderPage,
    FooterPage
  
  },
  data(){
    return{

    
    }
    
  },
  mounted(){

   
  }


  
}
</script>



