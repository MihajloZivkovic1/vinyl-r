<template>
    <div>
      <div class="hero_area">
        <!-- header section strats -->
       
        <!-- end header section -->
        <!-- slider section -->
     
        <!-- end slider section -->
      </div>
      <!-- book section -->
     

      <!-- end book section -->

      <!-- car section -->

      <section class="car_section layout_padding2-top layout_padding-bottom">
        <div class="container">
          <div class="heading_container">
            <h2>
              {{title}}
            </h2>
            <p>
              {{ quote }}
            </p>
          </div>
          <div class="car_container" >
            <div class="box" v-for="artist, index in artists" :key="index">
              <div class="img-box">
                <img :src="artist.images[2].url" :alt="artist.name + ' Image'">
              </div>
              <div class="detail-box">
                <h5>
                  {{artist.name}}
                </h5>
                <p>
                  {{artist.type}}
                </p>
                <a href="">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- end car section -->

      <!-- about section -->

      <section class="about_section layout_padding-bottom">
        <div class="container-fluid">
          <div class="row">
            <div v-for="desc, index in playlistDesc" :key="index">
                      <h1>{{ desc.title }}</h1>
            </div>
            <div class="col-md-7 px-0">
              <div class="img-box">
                <img :src="playlist.items[0].track.album.images[0].url" :alt="playlist.items[0].track.album.name + ' Image'">
              </div>
            </div>
            <div class="col-md-4 col-lg-3">
              <div class="detail-box">
                <h2>
                  {{ playlist.items[0].track.album.name + " " + 'By the Artist : ' + playlist.items[0].track.artists[0].name }}
                </h2>
                
                <a href="">
                
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- end about section -->


      <!-- best section -->

      <section class="best_section">
        <div class="container">
          <div class="book_now">
            <div class="detail-box">
              <h2>
                Our Best Playlist
              </h2>
              <p>
                It is a long established fact that a reader will be distracted by the
              </p>
            </div>
            <div class="btn-box">
              <a href="">
                Listen Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- end best section -->

      <!-- rent section -->

      <section class="rent_section layout_padding">
        <div class="container">
          <div class="rent_container">
            <div class="box" v-for="item,index in playListItems" :key="index">
               <p>Artist Name:{{ item.track.album.artists[0].name }}</p>
              <div class="img-box">
                 <img :src="item.track.album.images[0].url">
              </div>
              <div class="price">
                  <p>{{ item.track.album.name }}</p>
                  <p>Release Date: {{ item.track.album.release_date }}</p>
              </div>
            </div>
        </div>
          <div class="btn-box">
            <a href="">
             
            </a>
          </div>
        </div>
      </section>


      <!-- end rent section -->

      <!-- blog section -->

 
      <!-- end blog section -->

      <!-- us section -->


      <!-- end us section -->

      <!-- client section -->

      <section class="client_section layout_padding">
        <div class="container">
          <div class="heading_container">
            <h2>
              What Is say Customer
            </h2>
            <p>
              It is a long established fact that a reader will be distracted by the
            </p>
            <h2>Messages:</h2>
            <ul>
              <li v-for="(message, index) in messages" :key="index">{{ message.name }}: {{ message.message }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- end client section -->

      <!-- contact section -->


      <!-- end contact section -->

      <!-- map section -->
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex';
export default{

  data(){
    return{
        title:"Better Way For Find Your Favourite Music",
        quote:"Music Can Help You Concentrate and Work Better..",
        artists:[],
        playlist:[],
        playlistDesc:[
          {
            title:"Listen to our music playlist",
            name:"Playlist"
          }
        ],
        playListItems:[]

        

    }
  },
  mounted(){
    this.getThreeArtists();
    this.getOnePodcast();
    this.getPlaylistItems();
  },
  methods:{
    getThreeArtists(){
      const lsToken = localStorage.getItem('token')
      axios.get('https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6',{
        headers:{
          Authorization:`Bearer ${lsToken}`
        }
      }).then(response => {
        this.artists = response.data.artists
        // console.log(response)
        // console.log(this.artists)
      }).catch(error => {
        console.error(error)
      })
    },
    getOnePodcast(){
      const lsToken = localStorage.getItem('token')
      axios.get('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n',{
        headers:{
          Authorization:`Bearer ${lsToken}`
        }
      }).then(response => {
        this.playlist = response.data.tracks
        console.log(this.playlist)
      }).catch(error => {
        console.error(error)
      })
    },
    getPlaylistItems(){
      const lsToken = localStorage.getItem('token')
      axios.get('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks',{
        headers:{
          Authorization:`Bearer ${lsToken}`
        }
      }).then(response => {
        this.playListItems = response.data.items
        console.log(this.playListItems) 
      }).catch(error => {
        console.error(error)
      })
    },

   
  },
  computed:{
    ...mapState(['messages'])
  }

}
</script>
<style>
/* Styling for the car section */
.car_section {
  background-color: #f4f4f4;
  padding: 60px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.heading_container {
  text-align: center;
  margin-bottom: 40px;
}

.heading_container h2 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.heading_container p {
  font-size: 18px;
  color: #666;
}

.car_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
  width: 300px;
  transition: transform 0.3s ease-in-out;
}

.box:hover {
  transform: translateY(-5px);
}

.img-box {
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.img-box img {
  width: 100%;
  height: auto;
}

.detail-box {
  padding: 20px;
}

.detail-box h5 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.detail-box p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.detail-box a {
  display: inline-block;
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

.detail-box a:hover {
  background-color: #555;
}


</style>