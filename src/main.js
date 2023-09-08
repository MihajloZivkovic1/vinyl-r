
import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import HomePage from './views/HomePage.vue'
import ContactPageVue from "./views/ContactPage.vue";
import CarsPageVue from './views/MusicPage.vue';
import FavArtistPage from "./views/FavArtistsPage.vue"
import RegisterPage from "./views/RegisterPage.vue"
import AdminPanel from "./views/AdminPanel.vue"
import LoginPage from "./views/LoginPage.vue"
import WebPlayerVue from './views/WebPlayer.vue'
import RegisteredUsers from "./views/RegisteredUsers.vue"
// import SavedSongs from './views/SavedSongs.vue'
import UserList from './views/UserList.vue'
import PlayList from './views/PlaylistOfUser.vue'
var routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/player",
    name: "Player",
    component: WebPlayerVue
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPageVue
  },
  {
    path: "/songs",
    name: "Portfolio",
    component: CarsPageVue
  },
  {
    path: "/favArtist",
    name: "FavArtists",
    component: FavArtistPage
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage
  },
  {
    path: "/registeredUsers",
    name: 'registeredUsers',
    component: RegisteredUsers
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    meta: { requiresAdmin: true },
  },
  {
    path: '/user',
    name: 'user',
    component: HomePage,
    meta: { requiresUser: true },
  },
  {
    path: '/moderator',
    name: 'moderator',
    component: HomePage,
    meta: { requiresModerator: true },
  },
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    component: UserList
  },
  {
    path: '/playlist/:userId',
    component: PlayList
  }



]

const router = new VueRouter({
  routes: routes
})
router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAdmin && (!userData || userData.role !== 'admin')) {
    next({ name: 'login' });
  } else if (to.meta.requiresUser && (!userData || userData.role !== 'user')) {
    next({ name: 'login' });
  } else if (to.meta.requiresModerator && (!userData || userData.role !== 'moderator')) {
    next({ name: 'login' });
  } else {
    next();
  }
});

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.use(VueRouter);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

const client_id = '808c5b57174942c689010f3ae23e4f0b';
const client_secret = '9179302881934ac8b2beb35946894023';
const authHeader = `Basic ${btoa(`${client_id}:${client_secret}`)}`;

const authOptions = {
  method: 'post',
  url: 'https://accounts.spotify.com/api/token',

  headers: {
    'Authorization': authHeader,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: 'grant_type=client_credentials'
};

axios(authOptions)
  .then(response => {
    if (response.status === 200) {
      const token = response.data.access_token;
      localStorage.setItem('token', token)
      console.log('Access Token:', token); // Use the token as needed
    }
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
