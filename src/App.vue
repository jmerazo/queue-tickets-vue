<template>
  <menu-top></menu-top>    
  <router-view></router-view>  
</template>

<script>
import menuTop from './components/menuTop.vue'

export default {
  name: 'App',
  components: {
    menuTop
  }
}
</script>

<style>

</style>
