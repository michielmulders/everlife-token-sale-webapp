<template>
  <v-app>
    <app-header></app-header>
    <v-container :class="{'smallScreen': $vuetify.breakpoint.smAndDown, 'mediumScreen': $vuetify.breakpoint.mdAndUp}">
      <v-content>
        <router-view/>
      </v-content>
    </v-container>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  name: 'App'
}
</script>
<style scoped>
  .smallScreen {
    padding-top: 100px;
  }
  .mediumScreen {
    padding-top: 100px;
  }
</style>
