<template>
  <div class="container">
    <h1><u>Register</u></h1>
    <form class="inlineform">
      <label for="email">Email</label><br>
      <input type="email" id="email" v-model="email" required><br>
      <label for="password">Password</label><br>
      <input type="password" id="password" v-model="password" required><br>
      <button @click="register">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from './firebaseConfig';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register(e) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
        console.log(`Account created for ${user.user.email}`);
        this.$router.push('/login');
      }).catch(err => {
          console.log(err.message);
      });
      
      e.preventDefault();
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
  line-height: 1em;
  padding: 1em;
}

button {
  padding: 0.5em 0.6em;
  font-size: 1.2em;
  background: #000;
  color: #fff;
  font-weight: bold;
  margin: 0.5em 2em 0.5em 2em;
  font-style: normal;
}

form {
  text-align: center;
}

input {
  font-size: 1.2em;
  line-height: 1.2em;
}

input[type="password"], input[type="email"] {
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

input[type="password"]:focus, input[type="email"]:focus {
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