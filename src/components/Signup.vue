<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
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
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

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
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password:'',
      passEye: true,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must have minimum 8 charater'
      ],
      passwordConfirm: this.password,
      passConfimEye: true,
      checkbox: false
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('signup', {
            name: this.name,
            email: this.email,
            password: this.password
          })
        }
      },
      checkConfirmPass(){
        return (this.passwordConfirm == this.password) || "Password do not match"    
      }
    }
  }
</script>
<style>
</style>
