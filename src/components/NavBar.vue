<template>
  <div>
    <div id="nav">
      <ul>
        <li v-if="isLoggedIn"><span class="email">{{ currentUser }}</span></li>
        <li v-if="isLoggedIn === true"><router-link to="/">Home</router-link></li>
        <li v-if="isLoggedIn === true"><router-link to="/asteroids">Asteroids</router-link></li>
        <li v-if="isLoggedIn === false"><router-link to="/signup">Signup</router-link></li>
        <li v-if="isLoggedIn === false"><router-link to="/login">Login</router-link></li>
        <li v-if="isLoggedIn === true"><button @click="logout">Logout</button></li>
      </ul>
    </div>
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
.email {
    padding: 15px;
}

#nav {
  height: 100%;
  display: flex;
  background-color: aquamarine;
  padding: 0.5em;
  margin: 0.5em;
}

#nav ul {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}

#nav li {
  text-align: center;
  flex: 1;
  line-height: 1.6em;
  font-size: 1.2em;
  list-style-type: none;
  padding: 0.5em;
  display: inline;
}

#nav a {
  text-decoration: none;
  color: #20f;
  overflow-wrap: break-word;
  font-weight: bold;
  font-family: monospace;
	font-size:30px;
  text-transform: uppercase;
}

#nav a:visited {
    color: #607;
}

#nav a:hover {
    text-decoration: underline;
}

button {
  padding: 0.5em 0.7em;
  font-size: 1em;
  background: #000;
  color: #fff;
  font-weight: bold;
  font-style: normal;
}
</style>
