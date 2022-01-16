<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
   
  }
}
</script>

<style>
html,body{
    padding:0;
    margin:0;
    box-sizing: border-box;
}
</style>
