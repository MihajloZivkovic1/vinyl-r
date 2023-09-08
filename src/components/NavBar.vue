<template>
    <div>
     
        <div>
            <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="#page-top">Rent-a-Vinyl</a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto my-2 my-lg-0">
                            <router-link v-for="link,index in links" :key="index" :to="link.path" class="nav-link bg-white">{{ link.name }}</router-link> 
                        </ul>
                    </div>
                </div>
               
            </nav>

        </div>
    </div>
   

</template>

<script>


    export default{

    name: "NavBar",
    data(){
        return{
            links: [
                { path: "/", name: "Home" },
                { path: "/player", name: "player" },
                { path: "/songs", name: "songs" },
                { path: "/contact", name: "contact" },
                { path: "/favArtist", name:"favArtist"},
                { path: "/register", name: "register" },
                { path: "/login", name: "login" },
                { path:"/admin",  name:"admin"},
                { path:'/registeredUsers', name:'registeredUsers'},

            ]
        }      
    },
   

}
</script>