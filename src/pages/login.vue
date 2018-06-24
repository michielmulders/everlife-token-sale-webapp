<template>
  <v-layout justify-center class="mt-5">
      <v-tabs class="modal"
        v-model="active"
        color="blue darken-4"
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
        <v-tab-item key="Signup" class="tab-item">
          <signup></signup>
        </v-tab-item>
        <v-tab-item key="Login" class="tab-item">
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
  .tab-item {
    padding: 10px;
  }
  .modal {
    width: 500px;
    border: 1px solid #2962FF;
    border-radius: 5px;
  }
</style>
