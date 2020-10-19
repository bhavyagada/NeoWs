<template>
  <v-container class="text-center mb-4">
    <h1 class="display-2 font-weight-bold mb-3">Registration</h1>
    <form class="inlineform">
      <label for="email">Email</label><br>
      <input type="email" id="email" v-model="email" required><br>
      <label for="password">Password</label><br>
      <input type="password" id="password" v-model="password" required><br>
      <v-btn x-large class="ma-2" color="primary" elevation="5" @click="register"><span>Register</span></v-btn>
    </form>
  </v-container>
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
      const db = firebase.firestore()

      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
        console.log(`Account created for ${user.user.email}`);
        db.collection('users').doc(user.user.uid).set({
          asteroid_ids: []
        })
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
  padding: 1em;
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