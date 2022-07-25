<template>
  <menu-top></menu-top>    
  <router-view></router-view>
  <footerBottom></footerBottom> 
</template>

<script>
import menuTop from './components/menuTop.vue'
import footerBottom from './components/footer.vue'

export default {
  name: 'App',
  components: {
    menuTop,
    footerBottom
  }
}
</script>

<style>

</style>
