<template>
  <div>
    <HelloWorld msg="List of Asteroids"/>
    <AsteroidDisplay />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import AsteroidDisplay from '@/components/AsteroidsDisplay.vue';

export default {
  name: 'Asteroids',
  components: {
    HelloWorld,
    AsteroidDisplay
  }
}
</script>
