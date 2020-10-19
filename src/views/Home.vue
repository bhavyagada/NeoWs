<template>
  <v-container class="text-center">
    <Favourites />
  </v-container>
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