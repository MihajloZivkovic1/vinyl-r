<template>
    <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img :src="artist.images[1].url" :alt="artist.name + ' Image'">
                </div> 
                <div class="col-md-8 mt-5">
                    <h1 class="artist-name">{{ artistName }} {{ getCurrentMonth() }}</h1>
                    <p class="artist-bio">{{ artistBiography }}</p>
                    <div class="artist-details">
                        <h2 class="artist-title">{{ artist.name }}</h2>
                        <div class="follower-count">{{ artist.followers.total }} Followers</div>
                        <p class="artist-genres">{{ artist.genres.join(", ") }}</p>
                        <a :href="artist.external_urls.spotify" target="_blank" class="spotify-link">View on Spotify</a>
                    </div>
                </div>
            </div>
    </div>
     
</template>

<script>
import axios from 'axios'
export default{

    data(){
       
        return {
            artistName:'Favorite artist of the Month',
            artistBiography:'Info about artist',
            artist:[]
        }
    },
    mounted(){
        this.getCurrentMonth(),
        this.getFavoriteArtistOfTheMonth()
    },
    methods:{
        getCurrentMonth(){
            const currentDate = new Date()
            const monthNames = [
                'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
                'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
            ]
            const currentMonthIndex = currentDate.getMonth();
            const currentMonthName = monthNames[currentMonthIndex];

            return currentMonthName;
        },
        getFavoriteArtistOfTheMonth(){
            // const token = 'BQCKXyffgcX9ibAz4Syzc5HbzC2IDVy_6vmgzkApW2iw1dB46zs3AtfSOtSIIA4lLWbIHySZ5EzwEgtEDZlYLWOnjijiKcAR3-5teL5ObYN_N6al9nM'
            const lsToken = localStorage.getItem('token')
            // localStorage.setItem('token', token)
            axios.get('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg',{
                headers: {
                    Authorization:`Bearer ${lsToken}`
                },
            }).then(response => {
                this.artist = response.data
                console.log(response)
            }).finally(error => {
                console.error(error)
            })

        }
    }
}
</script>
<style>
body {
    font-family: 'Helvetica Neue', sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
   
}

.row {
    display: flex;
    flex-wrap: wrap;
}

.col-md-4 {
    flex: 0 0 33.33%;
    max-width: 33.33%;
    padding: 10px;
    box-sizing: border-box;
}

.col-md-8 {
    flex: 0 0 66.66%;
    max-width: 66.66%;
    padding: 10px;
    box-sizing: border-box;
}

.img-fluid {
    max-width: 100%;
    height: auto;
}

.artist-name {
    font-size: 32px;
    margin-bottom: 10px;
    color: #333;
}

.artist-bio {
    font-size: 16px;
    margin-bottom: 20px;
    color: #666;
}

.artist-title {
    font-size: 28px;
    margin-bottom: 5px;
    color: #333;
}

.follower-count {
    font-size: 18px;
    margin-bottom: 15px;
    color: #1DB954;
}

.artist-genres {
    font-size: 14px;
    margin: 0;
    color: #888;
}

.spotify-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #1DB954;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease-in-out;
}

.spotify-link:hover {
    background-color: #168f3f;
}

</style>