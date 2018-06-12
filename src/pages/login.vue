<template>
  <v-layout justify-center>
      <v-tabs class="modal"
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
        grow
      >
        <v-tab ripple>
          Signup
        </v-tab>
        <v-tab ripple>
          Login
        </v-tab>
        <v-tab-item key="Signup">
          <signup></signup>
        </v-tab-item>
        <v-tab-item key="Login">
          <login></login>
        </v-tab-item>
      </v-tabs>
  </v-layout>
</template>


<script>
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
export default {
  data() {
    return {
      active: null,
    };
  },
  components: {
    Login,
    Signup
  },
  methods: {}
};
</script>

<style>
  .modal {
    width: 500px;
  }
</style>
