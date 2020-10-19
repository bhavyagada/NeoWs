<template>
  <div>
    <v-container class="text-center mb-4">
      <v-container class="mb-4">
        <h1 class="display-2 font-weight-bold">Filter By ID or Dates</h1>
      </v-container>
      <v-btn x-large rounded dark elevation="7" id="aid" @click.prevent="idClicked">Serach Asteroid using ID</v-btn><br><br>
      <v-btn x-large rounded dark elevation="7" id="date" @click.prevent="dateClicked">Search Asteroids within a Date Range (7 Days)</v-btn>
        <div v-if="idButtonClicked === true">
          <v-container class="mb-4">
            <form class="inlineform">
              <label for="asid">Enter ID</label>
              <input type="number" id="asid" placeholder="Enter Asteroid ID" onfocus="this.value=''">
              <v-btn x-large color="primary" @click.prevent="searchById"><v-icon>mdi-database-search</v-icon>Find</v-btn>
            </form>
          </v-container>
          <v-container class="mb-4" v-if="isIdLoading === true">
            <v-simple-table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Potentially Hazardous</th>
                <th>URL</th>
              </tr>
              <tr>
                <td>{{ asteroid.id }}</td>
                <td>{{ asteroid.name }}</td>
                <td>{{ asteroid.is_potentially_hazardous_asteroid }}</td>
                <td><a :href=asteroid.nasa_jpl_url target="_blank">Detailed Information</a></td>
              </tr>
            </v-simple-table>
            <v-btn x-large color="primary" @click="reloadPage">Pick Another Filter</v-btn>
          </v-container>
        </div>
        <div v-if="dateButtonClicked === true">
          <v-container class="mb-4">
            <form class="inlineform">
              <label for="sdate">Enter Start Date</label><br>
              <input type="date" id="sdate" required><br>
              <label for="edate">Enter End Date</label><br>
              <input type="date" id="edate" required><br>
              <v-btn x-large color="primary" @click.prevent="searchByDate"><v-icon>mdi-database-search</v-icon>Find</v-btn>
            </form>
          </v-container>
          <v-simple-table v-if="isDateLoading === true">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Potentially Hazardous</th>
              <th>URL</th>
            </tr>
            <tr v-for="a in asteroids" v-bind:key="a.id">
              <td>{{ a.id }}</td>
              <td>{{ a.name }}</td>
              <td>{{ a.is_potentially_hazardous_asteroid }}</td>
              <td><a :href=a.nasa_jpl_url target="_blank">Detailed Information</a></td>
            </tr>
          </v-simple-table>
          <v-btn x-large rounded dark elevation="7" v-if="isDateLoading === true" @click.prevent="prevDay">Previous Day</v-btn>
          <v-btn x-large rounded dark elevation="7" v-if="isDateLoading === true" @click.prevent="nextDay">Next Day</v-btn><br>
          <v-btn x-large color="primary" @click="reloadPage">Pick Another Filter</v-btn>
        </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AsteroidFilter',
  data() {
    return {
      asteroid: [],
      asteroids: [],
      error: [],
      dates: [],
      idButtonClicked: false,
      dateButtonClicked: false,
      isIdLoading: false,
      isDateLoading: false,
      pindex: -1,
      nindex: 1
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
  methods: {
    hideButtons() {
      document.getElementById('aid').style.display = 'none';
      document.getElementById('date').style.display = 'none';
    },
    idClicked() {
      this.idButtonClicked = true;
      this.hideButtons()
    },
    dateClicked() {
      this.dateButtonClicked = true;
      this.hideButtons()
    },
    searchById() {
      let asteroidid = document.getElementById('asid').value
      const idURL = "https://api.nasa.gov/neo/rest/v1/neo/"+asteroidid+"?api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"
      
      axios.get(idURL).then((result) => {
        this.isIdLoading = true
        this.asteroid = result.data
      }).catch(err => {
        this.isIdLoading = false
        this.error.push(err)
      })
    },
    searchByDate() {
      let startdate = document.getElementById('sdate').value;
      let enddate = document.getElementById('edate').value;

      const dateURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startdate+"&end_date="+enddate+"&detailed=true&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"
      
      axios.get(dateURL).then((result) => {
        this.isDateLoading = true
        this.asteroids = result.data.near_earth_objects[startdate]
        console.log(this.asteroids)
      }).catch(err => {
        this.isDateLoading = false
        this.error.push(err)
      })
    },
    prevDay() {
      let startdate = document.getElementById('sdate').value;
      let enddate = document.getElementById('edate').value;

      if(this.pindex < 0) {
        const dateURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startdate+"&end_date="+enddate+"&detailed=true&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"
      
        axios.get(dateURL).then((result) => {
          this.isDateLoading = true
          this.asteroids = result.data.near_earth_objects[startdate]
        }).catch(err => {
          this.isDateLoading = false
          this.error.push(err)
        })
      } else {
        const dateURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startdate+"&end_date="+enddate+"&detailed=true&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"
      
        axios.get(dateURL).then((result) => {
          this.isDateLoading = true
          this.asteroids = result.data.near_earth_objects[this.dates[this.pindex]]
          this.pindex -= 1
          this.nindex -= 1
        }).catch(err => {
          this.isDateLoading = false
          this.error.push(err)
        })
      }
    },
    nextDay() {
      let startdate = document.getElementById('sdate').value;
      let enddate = document.getElementById('edate').value;

      let diff = enddate.split("-")[2] - startdate.split("-")[2]
      let current = new Date(startdate)
      
      this.dates.push(startdate)
      for(let i = 0; i < diff; i++) {
        let currentStr = new Date(current.getTime()-(current.getTimezoneOffset()*60000)+86400000).toISOString().split("T")[0];
        current = new Date(currentStr)
        this.dates.push(current.toISOString().split("T")[0])
      }

      if(this.nindex === (diff + 1)) {
        const dateURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startdate+"&end_date="+enddate+"&detailed=true&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"
      
        axios.get(dateURL).then((result) => {
          this.isDateLoading = true
          this.asteroids = result.data.near_earth_objects[enddate]
        }).catch(err => {
          this.isDateLoading = false
          this.error.push(err)
        })
      } else {
        const dateURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startdate+"&end_date="+enddate+"&detailed=true&api_key=5g9iDC6teJ9Ulwm9cgCBcZ65SAfuU71QeZOnBn1l"

        axios.get(dateURL).then((result) => {
          this.isDateLoading = true
          this.asteroids = result.data.near_earth_objects[this.dates[this.nindex]]
          this.pindex += 1
          this.nindex += 1
        }).catch(err => {
          this.isDateLoading = false
          this.error.push(err)
        })
      }
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
  font-size: 1.5em;
}
</style>