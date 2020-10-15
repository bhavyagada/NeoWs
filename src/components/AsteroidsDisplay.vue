<template>
  <div>
    <table v-if="isLoading === true">
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
    </table>
    <button v-if="isLoading === true" @click="showLessAsteroids = !showLessAsteroids">
      {{showLessAsteroids===true? "Show All Asteroids" : "Show Less"}}</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AsteroidDisplay',
  data() {
    return {
      asteroids: [],
      errors: [],
      showLessAsteroids: true,
      isLoading: false
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
    const baseURI = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l'

    axios.get(baseURI).then((result) => {
      this.isLoading = true
      this.asteroids = result.data
    }).catch(e => {
      this.errors.push(e)
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
table {
  width: 100%;
  height: 320px;
  border-collapse: collapse;
  border: 1px solid #38678f;
  margin: auto;
  background: white;
}

td, th {
  padding: 0.5em;
  border: 1px solid black;
  display: table-cell;
}

th {
  background: rgb(37, 37, 47);
  color: white;
  border: 1px solid white;
}

tr {
    padding: 0.5em;
    font-weight: bold;
    display: table-row;
}

button {
	padding: 0.5em 0.6em;
	font-size: 1.2em;
	background: #000;
	color: #fff;
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 0.5em;
  font-style: normal;
}
</style>