<template>
  <div>
      <v-app-bar app color="primary" dark height="75" d-flex>
        <v-toolbar-title>NeoWs API Web Service</v-toolbar-title>
        <v-spacer></v-spacer>
        <h2 v-if="isLoggedIn"><span>{{ currentUser }}</span></h2>
        <v-spacer></v-spacer>
        <v-btn text x-large  to="/" v-if="isLoggedIn === true"><span class="mr-2">Favourites</span></v-btn>
        <v-btn text x-large  to="/asteroids" v-if="isLoggedIn === true"><span class="mr-2">Asteroids</span></v-btn>
        <v-btn text x-large  to="/filters" v-if="isLoggedIn === true"><span class="mr-2">Filters</span></v-btn>
        <v-btn text x-large  to="/signup" v-if="isLoggedIn === false"><span class="mr-2"><v-icon>mdi-login-variant</v-icon>Signup</span></v-btn>
        <v-btn text x-large to="/login" v-if="isLoggedIn === false"><span class="mr-2"><v-icon>mdi-login-variant</v-icon>Login</span></v-btn>
        <v-btn text x-large rounded dark v-if="isLoggedIn === true" @click="logout"><span class="mr-2"><v-icon>mdi-logout-variant</v-icon>Logout</span></v-btn>
      </v-app-bar>
    <router-view/>
  </div>
</template>

<script>
import firebase from './firebaseConfig'

export default {
    name: 'logout',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.go({path: this.$router.path});
            })
        }
    }    
}
</script>

<style scoped>
button {
  background: #000;
  color: #fff;
}
</style>
