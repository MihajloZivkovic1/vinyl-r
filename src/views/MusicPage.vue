<template>
    <div>
      <section class="car_section layout_padding">
        <div class="container">
          <div class="heading_container">
            <h2>
              Better Way For Find Your Favourite Music
            </h2>
            <p>
              It is a long established fact that a reader will be distracted by the readable
            </p>
          </div>
          <div class="car_container">
            <div class="box" v-for="a, index in artists" :key="index">
              <div class="artist">
                <template v-if="a !== null">
                  <div class="detail-box">
                    <h2>{{ a.name }}</h2>
                    <p>Genres: {{ a.genres.join(', ') }}</p>
                    <p>Followers: {{ a.followers.total }}</p>
                  </div>
                  
                  <div class="img-box">
                    <img :src="a.images[0].url" :alt="a.name + ' Image'">
                  </div>
                  <a :href="a.external_urls.spotify" target="_blank">View on Spotify</a>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
   
</template>

<script>
import axios from 'axios'
export default {
  
  data() {
    return {
      artists: [],
      albums:[]

    };
  },
  mounted() {
    this.fetchArtists();
    this.fetchAlbums();
  },
  methods: {
  
    fetchArtists(){

      // const token = 'BQBA8jzZb5D5sDH4ljdXKQOTg1q4H0Xw9DrFXWX-JC3nX4Fly76C26YSN6oSr6UKAtPm5pIacRFLjLP0IomfHzKp9byXhhmDfpv3KaowSFa3VMQ00uM'
      const lsToken = localStorage.getItem('token')
      // const albumId = '4aawyAB9vmqN3uQ7FjRGTy';
      axios.get(`https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6`, {
        headers:{
          Authorization:`Bearer ${lsToken}`
        },
      }).then(response => {
        console.log(response)
        this.artists = response.data.artists
        console.log(this.artists)
        
        
      }).catch(error => {
        console.error(error)
      })
    },
    fetchAlbums(){
      let lsToken = localStorage.getItem('token')
      axios.get('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc',{
        headers:{
          Authorization:`Bearer ${lsToken}`
        },
      }).then(response => {
        console.log(response)
        this.albums = response.data.albums
        console.log(this.albums)
      }).then(error => {
        console.error(error);
      })
    }
  },


};
</script>