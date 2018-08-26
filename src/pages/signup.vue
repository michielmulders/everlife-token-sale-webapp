<template>
<v-layout column align-center>
  <v-form ref="form" lazy-validation class="signup-form" :class="{'smallScreen': $vuetify.breakpoint.smAndDown, 'mediumScreen': $vuetify.breakpoint.mdAndUp}">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Full Name"

    <v-text-field
      v-model="phone"
      :rules="phoneRules"
      label="Phone"
      maxLength="15"
    ></v-text-field>

    <birthdate-picker v-model="birthdate"></birthdate-picker>

    <v-layout column class="mt-3">
      <label>Gender:</label>
      <v-radio-group v-model="gender" row>
        <v-radio label="Male" value="male" ></v-radio>
        <v-radio label="Female" value="female"></v-radio>
      </v-radio-group>
    </v-layout>

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
      required
    ></v-text-field>

    <v-checkbox
      v-model="termsCheckbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Acecept Terms"
      required
    ></v-checkbox>
    <v-layout justify-center>
      <vue-recaptcha sitekey="6LdfOmgUAAAAAK5Y9Q6TcrIeHVFyw97A9ijOlxvf" v-on:verify="captchaResponse" class="mt-5"></vue-recaptcha>
    </v-layout>
    <p v-if="error" class="red--text">{{error}}</p>
    <v-layout justify-center>
      <v-btn
        :disabled="!valid"
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
import birthdatePicker from '../components/birthdatePicker';

export default {
  data: () => ({
    error: "",
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required"
      // v => (v && v.length <= 10) || "Name must be less than 10 characters"
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
         /^([0-9]*)$/.test(v) || "Phone Number must be valid"
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
    birthdate: null,
    gender: 'male',
    reCaptcha: null,
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate() && this.birthdate) {
        if(!this.reCaptcha){
          this.error = "Captcha Required";
          return;
        }
        this.$store
          .dispatch("signup", {
            name: this.name,
            email: this.email,
            phone:this.phone,
            birthdate: this.birthdate,
            gender: this.gender,
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
    }
  },

  components: {
    birthdatePicker,
    VueRecaptcha
  },

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
