<template>
  <div class="topbar-component">
    <v-toolbar color="#212529" height="45px">
      <img style="padding-right:10px;" :src="images.barIcon" width="40px">
      <span class="white--text">AdotAqui</span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn depressed class="white--text bg-dark navbar-dark" color="#212529">
          <v-icon right dark left>person_add</v-icon>Registar
        </v-btn>
        <v-btn depressed class="white--text bg-dark navbar-dark" color="#212529">
          <v-icon right dark left>arrow_forward</v-icon>Login
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<style lang="sass" scoped>
    @import './index.scss';
</style>

<script>
export default {
  name: "Topbar-component",
  data() {
    return {
      errors_name: null,
      errors_pw: null,
      images: {
        barIcon: require("../../assets/images/iconwhite.png")
      }
    };
  },

  methods: {},
  mounted() {}
};
</script>
