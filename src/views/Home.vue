<template>
  <div class="home">
    <h1><u>Your Favourite Asteroids</u></h1>
    <Favourites />
  </div>
</template>

<script>
import Favourites from '@/components/Favourites.vue'

export default {
  name: 'Home',
  components: {
    Favourites
  }
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
  line-height: 1em;
  padding: 1em;
}
</style>