<template>
<v-container>
  <v-layout align-center column class="testBorder">
    <h1 class="text--darken-4"> KYC Form </h1>
    <h4 class="grey--text text--darken-1">Upload your photos to begin the KYC review process</h4>
    <v-layout column mt-2>
      <v-flex class="testBorder">
        <v-layout row>
          <v-flex
            class="testBorder"
            offset-xl2 xl5
            offset-lg2 lg5
            offset-md1 md6
            offset-sm2 sm5
          >
              <v-layout column>
                <h3>STEP 1 : Upload Your Photo ID</h3>
                <img v-show="file1URL" class="uploadedImg" :src="file1URL" alt="Photo ID">
                <input
                  type="file"
                  @change="processFile1($event)"
                  accept="image/*"
                >
                <p class="grey--text text--darken-1 mt-2">Please provide a clear photo of your Government Issued ID, Passport or Driver's Licence.</p>
              </v-layout>
          </v-flex>
          <v-flex
            class="testBorder"
            offset-xl1 xl3
            offset-lg1 lg3
            offset-md1 lmd3
          >
            <img src="@/assets/step1-image.png" alt="Step 1">
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- Step 2 -->
      <v-flex class="testBorder">
        <v-layout row mt-3>
          <v-flex
            class="testBorder"
            offset-xl2 xl5
            offset-lg2 lg5
            offset-md1 md6
            offset-sm2 sm5
          >
              <v-layout column>
                <h3>STEP 2 : Upload Your Selfie With Photo ID</h3>
                <img v-show="file2URL" class="uploadedImg" :src="file2URL" alt="Selfie with Photo ID">
                <input
                  type="file"
                  @change="processFile2($event)"
                  accept="image/*"
                >
                <p class="grey--text text--darken-1 mt-2">Please provide a photo of you holding your identity Card front side. Make sure your face is clearly visible and that all ID details are clearly readable.</p>
              </v-layout>
          </v-flex>
          <v-flex
            class="testBorder"
            offset-xl1 xl3
            offset-lg1 lg3
            offset-md1 md3
          >
            <img src="@/assets/step2-image.png" alt="Step 2">
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-flex mt-5>
      <v-btn
          :loading="loading"
          :disabled="!valid || loading"
          color="blue lighten-1"
          class="white--text"
          large
          @click="submit"
          @click.native="loader = 'loading'"
      >
          {{saveBtnTxt}}
          <v-icon right dark>cloud_upload</v-icon>
          <span slot="loader" class="custom-loader">
            <v-icon color="blue lighten-1">cached</v-icon>
          </span>
      </v-btn>
      <v-btn
        v-show="!isIDMAccepted"
        :disabled="!isDocsAvailable"
        @click="$emit('next-btn-clicked')"
        color="blue lighten-1"
        class="white--text"
        large
      >
        Next
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data: () => ({
    file1: null,
    file2: null,
    valid: false,
    loading: false,
    loader: null,
    saveBtnTxt: "save"
  }),
  methods: {
    submit() {
      this.$store
        .dispatch("saveKycDocs", {
          document1: this.file1URL,
          document2: this.file2URL
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    processFile1(event) {
      this.file1 = event.target.files[0];
      this.$store.dispatch('imgUpload', {
        key: 'document1',
        data: this.file1
      });
      if (this.file2) {
        this.valid = true;
      }
    },
    processFile2(event) {
      this.file2 = event.target.files[0];
      this.$store.dispatch('imgUpload', {
        key: 'document2',
        data: this.file2
      });
      if (this.file1) {
        this.valid = true;
      }
    }
  },
  computed: {
    file1URL() {
      return this.$store.state.user.kycDocs.document1;
    },
    file2URL() {
      return this.$store.state.user.kycDocs.document2;
    },
    isIDMAccepted() {
      const idmStatus = this.$store.getters.idmStatus;
      return idmStatus != '';
    },
    isDocsUploaded() {
      return this.$store.getters.isDocsUploaded;
    },
    isDocsAvailable() {
      return this.$store.getters.isDocsAvailable;
    }
  },
  watch: {
    loader() {
      this.loading = true;
    },
    isDocsUploaded(value) {
      if(value) {
        this.loading = false;
        this.saveBtnTxt = "SAVED"
      }
    }
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.replace("/kyc");
    }
  }
};
</script>
<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.uploadedImg {
  width: 150px;
  height: 80px;
  margin: 10px 0;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
