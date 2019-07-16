<template>
  <div class="login-component">
    <div class="text-center" style="margin-top:20px;margin-bottom:20px;">
      <v-layout align-center justify-center row>
        <v-flex xs3>
          <b-img class="logo" center :src="images.mainIcon"></b-img>
          <p class="text-xs-center logo-text">AdotAqui</p>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="email"
                :rules="[rules.emailExists, rules.emailValidate]"
                required
                prepend-icon="person"
                name="login"
                label="E-mail"
                type="text"
              ></v-text-field>

              <p v-if="errors_name">{{ errors_name }}</p>

              <v-text-field
                v-model="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                :rules="[rules.passwordExists]"
                required
              ></v-text-field>

              <div class="form-group">
                <p v-if="errors_pw">{{ errors_pw }}</p>
                <v-layout justify-center>
                  <v-checkbox
                    label="Guardar dados?"
                    class="ma-0 pa-0"
                    required
                    style=" margin-bottom:0rem; max-width: 150px"
                  ></v-checkbox>
                </v-layout>
              </div>
              <div v-if="error" class="alert alert-danger">{{error}}</div>
              <v-btn
                block
                type="submit"
                :disabled="getAllConfirmations"
                color="#FC6600"
                class="white--text"
              >Login</v-btn>
            </v-form>
          </v-card-text>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<style lang="sass" scoped>
    @import './LoginPage.scss';
</style>

<script>
import { authenticationService } from "@/_services";
import { router } from '@/_helpers';

export default {
  name: "Login-component",
  data() {
    return {
      errors_name: null,
      errors_pw: null,
      error: "",
      images: {
        mainIcon: require("../assets/images/iconblack.png")
      },
      valid: false,
      e1: true,
      password: "",
      existsmail: false,
      existspassword: false,
      validemail: false,
      passwordRules: [v => !!v || "Password obrigatória"],
      email: "",
      returnUrl: "",
      rules: {
        emailExists: value => {
          this.existsmail = !!value;
          return !!value || "E-mail obrigatório";
        },
        passwordExists: value => {
          this.existspassword = !!value;
          return !!value || "Password obrigatória";
        },
        emailValidate: value => {
          const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          this.validemail = pattern.test(value);
          return pattern.test(value) || "E-mail inválido";
        }
      }
    };
  },
  created() {
    if (authenticationService.currentUserValue) {
      return router.push("/");
    }
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  computed: {
    getAllConfirmations() {
      let allConfirmations = [
        this.validemail,
        this.existsmail,
        this.existspassword
      ];
      let checker = arr => arr.every(v => v === true);
      return !checker(allConfirmations);
    }
  },
  methods: {
    submit() {
      authenticationService.login(this.email, this.password).then(
        user => router.push(this.returnUrl),
        error => { this.error = error; }
      );
    }
  }
};
</script>
