<template>
  <v-app>
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark" style="z-index:2">
        <router-link to="/" class="navbar-brand">
          <b-img width="30" height="30" :src="images.mainIcon"></b-img>AdotAqui
        </router-link>

        <!--<div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
        </div>-->

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
    <!-- footer -->
    <footer class="page-footer font-small mdb-color" style="background-color: white;">
      <!-- Footer Links -->
      <div class="container footline text-center text-md-left">
        <!-- Footer links -->
        <div class="row text-center text-md-left pb-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-3 col-xl-3 mx-auto">
            <h6 class="text-uppercase mb-4 font-weight-bold">AdotAqui</h6>
            <p>
              Albergue destinado aos nossos amigos peludos ou não.
              <br>
Sem qualquer fins lucrativos.
            </p>
          </div>
          <!-- Grid column -->

          <hr class="w-100 clearfix d-md-none">

          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto">
            <h6 class="text-uppercase mb-4 font-weight-bold">Mapa Site</h6>
            <p>
              <router-link to="/">Home</router-link>
            </p>
            <p>
              <router-link v-if="isAdmin" to="/admin">Administrador</router-link>
            </p>
            <p>
              <router-link v-if="currentUser" to="/profile">Perfil</router-link>
            </p>
            <p>
              <router-link v-if="!currentUser" to="/signup">Registar</router-link>
            </p>
            <p>
              <router-link v-if="!currentUser" to="/login">Entrar</router-link>
            </p>
          </div>
          <!-- Grid column -->

          <hr class="w-100 clearfix d-md-none">

          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto">
            <h6 class="text-uppercase mb-4 font-weight-bold">Links Utéis</h6>
            <p>
              <a href="https://www.lpda.pt/">Liga Portuguesa dos Direitos do Animal</a>
            </p>
            <p>
              <a href="https://www.mundodosanimais.pt/">Mundo dos Animais</a>
            </p>
          </div>

          <!-- Grid column -->
          <hr class="w-100 clearfix d-md-none">

          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto">
            <h6 class="text-uppercase mb-4 font-weight-bold">Contactos</h6>
            <p>
              <i class="fas fa-home mr-3"></i> Rua sem nome, Fernão Pires
            </p>
            <p>
              <i class="fas fa-envelope mr-3"></i> geral@adotaqui.com
            </p>
            <p>
              <i class="fas fa-phone mr-3"></i> + 351 234 666 88
            </p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Footer links -->

        <hr>

        <!-- Grid row -->
        <div class="row d-flex align-items-center">
          <!-- Grid column -->
          <div class="col-md-7 col-lg-8">
            <!--Copyright-->
            <p class="text-center text-md-left">©{{ new Date().getFullYear() }} AdotAqui</p>
          </div>
          <!-- Grid column -->
          <!-- Grid column -->
          <div class="col-md-5 col-lg-4 ml-lg-0">
            <!-- Social buttons -->
            <div class="text-center text-md-right">
              <a class="btn-floating btn-sm rgba-white-slight mx-1">
                <i class="fab fa-facebook"></i>
              </a>
              <a class="btn-floating btn-sm rgba-white-slight mx-1">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="btn-floating btn-sm rgba-white-slight mx-1">
                <i class="fab fa-google-plus"></i>
              </a>
              <a class="btn-floating btn-sm rgba-white-slight mx-1">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
      <!-- Footer Links -->
    </footer>
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