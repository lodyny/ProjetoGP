<template>
  <v-app>
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">
          <b-img width="30" height="30" :src="images.mainIcon"></b-img>
          AdotAqui
        </router-link>
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
        </div>

      <div class="navbar-nav ml-auto">
          <router-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Administrador</router-link>
          <router-link v-if="currentUser" to="/profile" class="nav-item nav-link">Perfil</router-link>
          <router-link v-if="!currentUser" to="/signup" class="nav-item nav-link">Registar</router-link>
          <router-link v-if="!currentUser" to="/login" class="nav-item nav-link">Entrar</router-link>
          <a @click="logout" v-if="currentUser" class="nav-item nav-link">Sair</a>
      </div>
      </nav>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import { authenticationService } from "@/_services";
import { router, Role } from "@/_helpers";

export default {
  name: "app",
  data() {
    return {
      currentUser: null,
      images: {
        mainIcon: require("../assets/images/iconwhite.png")
      }
    };
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  },
  methods: {
    logout() {
      authenticationService.logout();
      router.push("/login");
    }
  }
};
</script>