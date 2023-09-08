<template>
  <div id="app" class="spotify-player">
    <h1 class="title">Spotify Song Player</h1>
    <div class="search-container">
      <input v-model="searchQuery" class="search-input" placeholder="Enter song name">
      <button @click="searchSong" class="search-button">Search</button>
    
    </div>
    <div v-if="songUri" class="now-playing">
      <h2 class="now-playing-title">Now Playing:</h2>
      <p class="song-info">{{ songName }}</p>
      <p class="song-info">{{ artistName }}</p>
      <p class="song-info">{{ albumName }}</p>
     
      <img :src="artistImage" class="pt-5">
      <div class="player-controls">
        <button @click="playSong" class="control-button">Play</button>
        <button @click="pauseSong" class="control-button">Pause</button>
        <button @click="nextSong" class="control-button">Next</button>
        <!-- <button @click="addSongToStore">Dodaj pesmu u Store</button> -->
        <button @click="createPlaylistFromStore" class="control-button">Add to playlist</button>
        <a :href="externalUrls" class="spotify-link">View on Spotify</a>
      </div>
       <p class="song-info">Popularity:{{ popularity }}</p>
      
    </div>
    <div class="addedSongs">
          <h1>AddedSongs</h1>
          <ul>
              <li v-for="song in playlist" :key="song.id">
                  {{ song.name }}
              </li>
          </ul>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/store';
export default {
  store,
  data() {
    return {
      searchQuery: '',
      songUri: null,
      songName: '',
      artistName:'',
      externalUrls:'',
      artistImage:'',
      popularity:'',
      albumName:'',
      playlistName:'',
      song:{
        name:'',
        artist:''
      }
    };
  },
  methods: {
    searchSong() {
      const accessToken = localStorage.getItem('token')
      axios.get(`https://api.spotify.com/v1/search`, {
        params: {
          q: this.searchQuery,
          type: 'track',
          limit: 1
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => {
          const track = response.data.tracks.items[0];
          this.songUri = track.uri;
          this.songName = track.name;
          this.artistName = track.artists[0].name;
          this.externalUrls = track.external_urls.spotify;
          this.artistImage = track.album.images[1].url
          this.popularity = track.popularity
          this.albumName = track.album.name
          const song = {
            name:this.songName,
            artist:this.artistName  
          }
          this.$store.dispatch('addSongToStore', song)
          console.log(this.songUri)
        })
        .catch(error => {
          console.error('Error searching for song:', error);
        });
        
    },
    playSong() {
      const spotifyUri = this.songUri
      const accessToken = localStorage.getItem('token')
      console.log(spotifyUri)

      axios({ 
        method:'PUT',
        url : 'https://api.spotify.com/v1/me/player/play',
        headers:{
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type':'application/json'
        },
        data:{
          uris:[spotifyUri]
        }  
      })
      .then(response => {
        console.log('Song started playing:', response)
      })
      .catch(error => {
        console.error('Error playing song', error)
        
      })
    },
    pauseSong() {
      const accessToken = localStorage.getItem('token'); // Retrieve the access token
      axios({
        method: 'put',
        url: 'https://api.spotify.com/v1/me/player/pause',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          console.log('Song paused:', response);
        })
        .catch(error => {
          console.error('Error pausing song:', error);
        });
    },
    nextSong() {
      const accessToken = localStorage.getItem('token'); // Retrieve the access token

      axios({
        method: 'post',
        url: 'https://api.spotify.com/v1/me/player/next',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          console.log('Next song played:', response);
        })
        .catch(error => {
          console.error('Error playing next song:', error);
        });
    },
    // addSongToStore(){
    //   const song = {
    //     name:this.songName,
       
    //   }
    //   this.$store.dispatch('addSongToStore', song)
    // },
    createPlaylistFromStore(){
      const song = this.$store.state.songs
      if(song){
        this.$store.dispatch('createPlaylist', song)
      }
      else{
        console.error('Nema pesme za stvaranje playliste')
      }
    },
    addSongToPlaylist() {
      const userId = this.$store.state.currentUser; 
      const song = { 
        name:this.songName,
        artist:this.artistName
       };

      this.$store.dispatch('addSongToPlaylist', { userId, song });
    },
    
   
  },
  computed:{
   playlist() {
      return this.$store.state.songs
    }
  }
};
</script>
<style scoped>
.spotify-player {
  margin-top: 150px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #1DB954;
  /* Spotify green */
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.now-playing {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.now-playing-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.song-info {
  font-size: 18px;
  margin-bottom: 8px;
}

.player-controls {
  display: flex;
  justify-content: center;
}

.control-button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.control-button:hover {
  background-color: #0e8a38;
  /* Slightly darker green on hover */
}
.pt-5{
  padding: 20px;
}
</style>