<template>
<v-footer height="100" dark color="blue accent-3">
    <v-container>
        <v-layout row align-content-space-between>
            <v-flex>
                <span>Copyright &copy; EverLife.AI 2018</span>
            </v-flex>
            <v-flex>
                <v-layout justify-end>
                    <a href="https://everlife.ai/privacy-policy.htm" target="_blank" class="white--text footer-link">Privacy Policy</a>
                    <a href="https://everlife.ai/terms.htm" target="_blank" class="white--text footer-link ml-3">Terms & Conditions</a>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</v-footer>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    };
  }
};
</script>

<style scoped>
    .footer-link {
        text-decoration: none;
    }
</style>