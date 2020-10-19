<template>
  <div>
    <v-container class="text-center mb-4">
      <v-container class="mb-4">
        <h1 class="display-2 font-weight-bold">List of all Asteroids</h1>
        <form class="inlineform">
          <label for="asid">Enter ID</label>
          <input type="number" id="asid" placeholder="Enter Asteroid ID to Mark as Favourite" onfocus="this.value=''">
          <v-btn x-large color="primary" @click.prevent="addToFav"><v-icon>mdi-pen-plus</v-icon>Add to Favourites</v-btn>
        </form>
      </v-container>
      <v-simple-table v-if="isLoading === true">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Potentially Hazardous</th>
          <th>URL</th>
        </tr>
        <tr v-for="asteroid in asteroidsToDisplay" v-bind:key="asteroid.id">
          <td>{{ asteroid.id }}</td>
          <td>{{ asteroid.name }}</td>
          <td>{{ asteroid.is_potentially_hazardous_asteroid }}</td>
          <td><a :href=asteroid.nasa_jpl_url target="_blank">Detailed Information</a></td>
        </tr>
      </v-simple-table>
      <v-btn x-large rounded dark elevation="7" v-if="isLoading === true" @click.prevent="prevPage">Previous Page</v-btn>
      <v-btn x-large rounded dark elevation="7" v-if="isLoading === true" @click.prevent="showLessAsteroids = !showLessAsteroids">
        {{showLessAsteroids===true? "Show All Asteroids" : "Show Less"}}</v-btn>
      <v-btn x-large rounded dark elevation="7" v-if="isLoading === true" @click.prevent="nextPage">Next Page</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from './firebaseConfig'
import fb from 'firebase/app'

export default {
  name: 'AsteroidDisplay',
  data() {
    return {
      asteroids: [],
      asteroid: [],
      errors: [],
      showLessAsteroids: true,
      isLoading: false,
      currentPage: 0,
      favourite: false,
      favouriteIds: [],
      currentUser: false
    }
  },
  created() {
    if(firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.uid;
    }
  },
  computed: {
    asteroidsToDisplay() {
      if (this.showLessAsteroids) {
        return this.asteroids.near_earth_objects.slice(0, 10);
      } else {
        return this.asteroids.near_earth_objects;
      }
    }
  },
  mounted() {
    let baseURI = "https://api.nasa.gov/neo/rest/v1/neo/browse?page="+this.currentPage+"&size=20&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"
    
    axios.get(baseURI).then((result) => {
      this.isLoading = true
      this.asteroids = result.data
    }).catch(e => {
      this.errors.push(e)
      this.isLoading = false
    })
  },
  methods: {
    prevPage() {
      if (this.currentPage === 0) {
        axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?page="+this.currentPage+"&size=20&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l").then((result) => {
          this.isLoading = true
          this.asteroids = result.data
        }).catch(e => {
          this.errors.push(e)
          this.isLoading = false
        })
      } else {
        axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?page="+(this.currentPage-=1)+"&size=20&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l").then((result) => {
          this.isLoading = true
          this.asteroids = result.data
        }).catch(e => {
          this.errors.push(e)
          this.isLoading = false
        })
      }
    },
    nextPage() {
      axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?page="+(this.currentPage+=1)+"&size=20&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l").then((result) => {
        this.isLoading = true
        this.asteroids = result.data
      }).catch(e => {
        this.errors.push(e)
        this.isLoading = false
      })
    },
    addToFav() {
      const db = firebase.firestore()

      let asteroidid = document.getElementById('asid').value
      
      db.collection('users').doc(this.currentUser).update({
        asteroid_ids: fb.firestore.FieldValue.arrayUnion(parseInt(asteroidid))
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

button {
	padding: 0.5em 0.6em;
	font-size: 1.2em;
  margin: 0.5em 2em 0.5em 2em;
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