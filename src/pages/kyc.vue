<template>
  <div>
    <document-upload v-show="!isNextClicked" v-on:next-btn-clicked="isNextClicked = true"></document-upload>
    <transition name="slide">
      <kyc-form v-show="isNextClicked"></kyc-form>
    </transition>
  </div>
</template>

<script>
import DocumentUpload from "../components/DocumentUpload";
import KYCForm from "../components/KYCForm";

export default {
  data() {
    return {
      isNextClicked: false
    }
  },
  computed: {
    isDocsUploaded() {
      return this.$store.getters.isDocsUploaded;
    }
  },
  beforeMount() {
    this.$store.dispatch("updateProfile");
  },
  components: {
    "document-upload": DocumentUpload,
    "kyc-form": KYCForm
  }
};
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: .5s;
}
.slide-enter {
  transform: translate(25%, 0);
}
.slide-leave-to {
  transform: translate(-25%, 0);
}
</style>
