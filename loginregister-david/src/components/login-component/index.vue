<template>
  <div class="login-component">
    <div class="text-center" style="margin-top:20px;">
      <v-layout align-center justify-center row>
        <v-flex xs3>
          <b-img class="logo" center :src="images.mainIcon"></b-img>
          <p class="text-xs-center logo-text">AdotAqui</p>
          <v-card-text>
            <v-form @submit="checkForm" method="post">
              <v-text-field
                v-model="email"
                :rules="emailRules"
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
                :rules="passwordRules"
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
              <v-btn block type="submit" color="#FC6600" class="white--text">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<style lang="sass" scoped>
    @import './index.scss';
</style>

<script>
export default {
  name: "Login-component",
  data() {
    return {
      errors_name: null,
      errors_pw: null,
      images: {
        mainIcon: require("../../assets/images/iconblack.png")
      },
      valid: false,
      e1: false,
      password: "",
      passwordRules: [v => !!v || "Password obrigatória"],
      email: "",
      emailRules: [
        v => !!v || "E-mail obrigatório",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail inválido"
      ]
    };
  },

  methods: {},
  mounted() {}
};
</script>
