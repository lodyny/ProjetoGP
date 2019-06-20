<template>
  <v-app>
    <v-content>
      <Topbar/>
      <Toolbar v-if="toolBarOpen"/>
      <AnimalGrid
        @closeBar="toolBarOpen = false"
        @openBar="toolBarOpen = true"
      />
    </v-content>
  </v-app>
</template>

<style lang="sass" scoped>
    @import './style.scss';
</style>

<script>
import Login from "./components/login-component/index";
import Register from "./components/register-component/index";
import Topbar from "./components/topbar-component/index";
import Toolbar from "./components/toolbar-component/index";
import AnimalGrid from "./components/animal-grid-component/index";

export default {
  name: "App",
  components: {
    Login,
    Topbar,
    Register,
    AnimalGrid,
    Toolbar
  },
  data() {
    return {
      toolBarOpen: true
    };
  },
  methods: {}
};
</script>
