<template>
  <v-form ref="form" v-model="valid" lazy-validation>
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
    <p v-if="error" class="red--text">{{error}}</p>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>

  </v-form>
</template>

<script>
export default {
  data: () => ({
    error: '',
    valid: true,
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
      v => (v && v.length >= 8) || "Password must have minimum 8 charater"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
          })
          .catch(error => {
            this.error = error.message;
          });
      }
    }
  }
};
</script>
<style>
</style>
