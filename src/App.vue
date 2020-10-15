<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/asteroids">Asteroids</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #012;
  text-transform: uppercase;
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
</style>
