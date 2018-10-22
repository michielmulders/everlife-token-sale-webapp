<template>
<v-layout column align-center>
  <v-form ref="form" lazy-validation class="signup-form" :class="{'smallScreen': $vuetify.breakpoint.smAndDown, 'mediumScreen': $vuetify.breakpoint.mdAndUp}">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      @keyup.enter="submit"
      required
    ></v-text-field>

    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="70"
      label="Full Name"
      maxLength="70"
      @keyup.enter="submit"
      required
    ></v-text-field>

    <v-text-field
      v-model="phone"
      :rules="phoneRules"
      label="Phone"
      maxLength="18"
      @keyup.enter="submit"
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
      @keyup.enter="submit"
      required
    ></v-text-field>

    <v-text-field
      v-model="passwordConfirm"
      :append-icon="passConfimEye ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (passConfimEye = !passConfimEye)"
      :type="passConfimEye ? 'password' : 'text'"
      label="Confirm password"
      ref="passwordConfirm"
      hint="At least 8 characters"
      name="passfield"
      :rules="[() => passwordConfirm == password || 'Password do not match']"
      counter
      @keyup.enter="submit"
      required
    ></v-text-field>

    <v-checkbox v-model="accepted" light>
      v-model="termsCheckbox"
      :rules="[v => !!v || 'You must agree to continue!']"
        <template slot="label">
         <a @click.stop href="https://everlife.ai/terms.htm" target="_blank"> Accept Terms</a>
        </template> required
      </v-checkbox>

      <v-layout justify-center>
      <vue-recaptcha :sitekey="reCaptchaSiteKey" v-on:verify="captchaResponse" class="mt-5"></vue-recaptcha>
      </v-layout>
      <p v-if="error" class="red--text">{{error}}</p>
    <v-layout justify-center>
      <v-btn
        :disabled="!hasAcceptedTerms && !valid"
        @click="submit"
        color="blue darken-2 white--text" large>
        Signup
      </v-btn>
    </v-layout>

  </v-form>
</v-layout>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
  data: () => ({
    error: "",
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v =>
        /^([^0-9!@#\$%\^\&*\)\(+=._-])+$/.test(v) || "Name must be valid"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],

    phone: "",
    phoneRules: [
      v =>
         /^(\+\d{1,3}[- ]?)?\d{5,15}$/.test(v) || "Phone Number must be valid"
    ],

    password: "",
    passEye: true,
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Password must have minimum 8 character"
    ],
    passwordConfirm: this.password,
    passConfimEye: true,
    termsCheckbox: false,
    reCaptcha: null,
    reCaptchaSiteKey: process.env.CAPTCH_SITE_KEY
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if(!this.reCaptcha){
          this.error = "Captcha Required";
          return;
        }
        this.$store
          .dispatch("signup", {
            name: this.name,
            email: this.email,
            phone:this.phone,
            password: this.password,
            reCaptchaResponse: this.reCaptcha,

          })
          .catch(error => {
            this.error = error.message;
          });
      }else{
        this.error = "Please fill in all the details"
      }
    },
    checkConfirmPass() {
      return this.passwordConfirm == this.password || "Password do not match";
    },
    captchaResponse(response){
      this.valid = true;
      this.reCaptcha = response;
    },
    hasAcceptedTerms() {
      this.termsCheckbox= true;
    }
  },

  components: {
    VueRecaptcha
  },

  created(){
    if(this.$store.getters.isLoggedIn){
      if(this.$store.getters.idmStatus == null && this.$store.getters.idmStatus != "ACCEPT"){
        this.$router.replace('/kyc');
      }else{
        this.$router.replace('/dashboard');
      }
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
