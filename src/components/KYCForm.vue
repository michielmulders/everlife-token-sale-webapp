<template>
  <v-layout align-center column>
    <h2>KYC Details</h2>
    <div id="idm-container" style="width: 500px"></div>
  </v-layout>
</template>

<script>
import axios from "../axios";

const plugin_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJrZXkiOiJwNHc4cmVwdWQwIn0.QvxcfdLV9GvIHFapVb6bNb_ImZWHlw_hU4FHLLDB57m0Y92xOl_sejxNtrPMGCyR3ErFuA6ltE14ymFh1Uwkx-qMdKTIZiZEnHeoINS5wnwoEkDOOanhLU9ipOVti0YEOX69aSzsqTVHZ_xAf2doywp4jvjJx_sHoYnKoh-Kn6ZUURaKSd71Qchd3xk9MybUE3LiBSMdjq13hIVmT-AWJfrEEFBJDMdfH76K3MF5VBifY2E9HM1wsnMf8UEQ7fKWpUMIv2wtmo5bIvhkg6PdqTumnsKNdgnucirHMCb2_8LiD4QPxosBvjLcbUi2JieT8aHHKUugZgKQVixqY0FGig";
_idm = {
  container_id: "idm-container",
  plugin_token: plugin_token,
  required_address_country_list: ["US", "GB", "CA", "ZA", "SE", "DK"],
  required_id_country_list: [
    "US::^(?!666|000|9\\d{2})\\d{3}[- ]{0,1}(?!00)\\d{2}[- ]{0,1}(?!0{4})\\d{4}$"
  ],
  country_blacklist: ["AR", "PR"],
  on_response: function(jwtresponse) {
    const array = jwtresponse.split(".");
    const header = JSON.parse(atob(array[0]));
    const response = JSON.parse(atob(array[1]));
    const signature = array[2];

    axios
      .post("api/kyc/idmDecision", {
        idmResponse: jwtresponse,
        kycResult: response.kyc_result
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
export default {
  created: function() {
    var a = document.createElement("script");
    var m = document.getElementsByTagName("script")[0];
    a.src = "https://cd1st.identitymind.com/sandbox/idm.min.js";
    m.parentNode.insertBefore(a, m);
  }
};
</script>

<style scoped>
</style>
