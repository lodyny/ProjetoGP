<template>
  <v-app>
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link v-if="!currentUser" to="/login" class="nav-item nav-link">Login</router-link>
          <router-link v-if="!currentUser" to="/signup" class="nav-item nav-link">Sign In</router-link>
          <router-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</router-link>
          <a @click="logout" v-if="currentUser" class="nav-item nav-link">Logout</a>
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
      currentUser: null
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