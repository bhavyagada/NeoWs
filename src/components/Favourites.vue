<template>
  <div>
    <v-container class="text-center mb-4">
      <v-container class="mb-4">
        <h1 class="display-2 font-weight-bold">Your Favourite Asteroids</h1>
        <form class="inlineform">
          <label for="asid">Enter ID</label>
          <input type="number" id="asid" placeholder="Enter Asteroid ID to Remove From Favourites" onfocus="this.value=''">
          <v-btn x-large color="primary" @click.prevent="removeFavs"><v-icon>mdi-pen-remove</v-icon>Remove from Favourites</v-btn>
        </form>
      </v-container>
      <v-simple-table v-if="isLoading === true && isEmpty === false"></v-simple-table>
      <v-simple-table fixed-header height="300">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Potentially Hazardous</th>
          <th>URL</th>
        </tr>
        <tr v-for="asteroid in asteroids" v-bind:key="asteroid.id">
          <td>{{ asteroid.id }}</td>
          <td>{{ asteroid.name }}</td>
          <td>{{ asteroid.is_potentially_hazardous_asteroid }}</td>
          <td><a :href=asteroid.nasa_jpl_url target="_blank">Detailed Information</a></td>
        </tr>
      </v-simple-table>
      <h2 v-if="isEmpty === true">Your Favourites List is Empty! Go to <a href="/asteroids">Asteroids</a> to add some.</h2>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from './firebaseConfig'
import fb from 'firebase/app'

export default {
  name: 'favourite',
  data() {
    return {
      ids: [],
      asteroids: [],
      isLoading: false,
      currentUser: false,
      isEmpty: false
    }
  },
  created() {
    if(firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.uid;
    }
    this.displayData()
    this.fetchFavs()
  },
  methods: {
    displayData() {
      const db = firebase.firestore()

      db.collection('users').doc(this.currentUser).get().then(doc => {
        this.ids = doc.data().asteroid_ids
        this.isLoading = true
      })
    },
    fetchFavs() {
      const db = firebase.firestore()
      let promises = []
      let aids = []

      db.collection('users').doc(this.currentUser).get().then(doc => {
        aids = doc.data().asteroid_ids
        if(aids.length === 0) {
          this.isEmpty = true
        }
        else {
          this.isEmpty = false
          for(let i = 0; i < aids.length; i++) {
            const idURL = "https://api.nasa.gov/neo/rest/v1/neo/"+aids[i]+"?api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"
            promises.push(axios.get(idURL)
              .then((result) => {
                this.isLoading = true
                this.asteroids.push(result.data)
              }).catch(err => {
                this.isLoading = false
                this.error.push(err)
              })
            )
          }
          Promise.all(promises).then(() => console.log(this.asteroids))
        }
      })
    },
    removeFavs() {
      const db = firebase.firestore()

      let asteroidid = document.getElementById('asid').value
      
      db.collection('users').doc(this.currentUser).update({
        asteroid_ids: fb.firestore.FieldValue.arrayRemove(parseInt(asteroidid))
      }).then(function() {
        console.log("Successfully Added to Favourite!");
      })
      .catch(function(error) {
        console.error("An Error Occured: ", error);
      });
      this.reloadPage()
    },
    reloadPage(){
      window.location.reload()
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
  padding: 0.5em;
}

button {
  padding: 0.5em 0.6em;
  font-size: 1.2em;
  margin: 0.5em 2em 0.5em 2em;
}

td, th {
  padding: 0.5em;
  border: 1px solid black;
  display: table-cell;
  text-transform: uppercase;
}

th {
  background: black;
  color: white;
  border: 1px solid white;
}

tr {
  padding: 0.5em;
  font-weight: bold;
  display: table-row;
  text-transform: uppercase;
}

form {
  text-align: center;
}

input {
  font-size: 1.2em;
  line-height: 1.2em;
}

input[type="number"], input[type="date"] {
  padding: 0.5em 0.6em;
  display: block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  max-width: 99%;
  width: 500px;
  margin: 10px;
}

input[type="number"]:focus, input[type="date"]:focus {
  outline: 0;
  border-color: #129FEA;
}

form.inlineform input {
  display: inline;
}

label {
  margin: 0.5em 0 0.2em;
  font-size: 1.75em;
}
</style>