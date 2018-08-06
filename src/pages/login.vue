<template>
<v-layout align-center column class="mt-5">
  <h1 class="blue--text text--darken-4"> Login </h1>

  <v-form ref="form" lazy-validation class="mt-5" :class="{'smallScreen': $vuetify.breakpoint.smAndDown, 'mediumScreen': $vuetify.breakpoint.mdAndUp}">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      ref="password"
      :append-icon="passEye ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (passEye = !passEye)"
      :type="passEye ? 'password' : 'text'"
      label="Enter password"
      hint="At least 8 characters"
      :rules="passwordRules"
      counter
      required
    ></v-text-field>
    <v-layout justify-center>
      <vue-recaptcha sitekey="6LdfOmgUAAAAAK5Y9Q6TcrIeHVFyw97A9ijOlxvf" v-on:verify="captchaResponse" class="mt-5"></vue-recaptcha>
    </v-layout>
    <p v-if="error" class="red--text">{{error}}</p>
    <v-layout justify-center>
      <v-btn
        :disabled="!valid"
        @click="submit" color="blue darken-2 white--text" class="mt-3" large>
        Login
      </v-btn>
    </v-layout>
  </v-form>
</v-layout>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
export default {
  data: () => ({
    error: '',
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    password: "",
    passEye: true,
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Password must have minimum 8 character"
    ],
    reCaptcha: null,
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if(!this.reCaptcha){
          this.error = "Captcha Required";
          return;
        }
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
            reCaptchaResponse: this.reCaptcha
          })
          .catch(error => {
            this.error = error.message;
          });
      }
    },

    captchaResponse(response){
      this.valid = true;
      this.reCaptcha = response;
    }
  },
  components: { VueRecaptcha },
  created(){
    if(this.$store.getters.isLoggedIn){
      this.$router.replace('/dashboard');
    }
  }
};
</script>
<style scoped>
  .smallScreen {
    width: 100%;
  }

  .mediumScreen {
    width: 400px;
  }

</style>
