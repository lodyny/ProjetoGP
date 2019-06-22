
<template>
  <div class="register-component">
    <div class="text-center" style="margin-top:20px; margin-bottom:20px;">
      <v-layout align-center justify-center row>
        <v-flex xs3>
          <p class="text-xs-center logo-text">AdotAqui</p>
          <v-form @submit.prevent="submit">
            <v-text-field
              class="ma-0"
              label="Email"
              v-model="email"
              :rules="[rules.emailExists, rules.emailValidate]"
              required
              validate-on-blur
            >
              <v-tooltip
                slot="append-outer"
                right
                color="white"
                :activator="!validemail ? '' : 'awb'"
              >
                <v-icon
                  slot="activator"
                  :color="existsmail ? (validemail ? 'green' : 'red') : 'primary'"
                >{{existsmail ? (validemail ? 'check' : 'help') : 'help'}}</v-icon>
                <span v-html="mailmessage"></span>
              </v-tooltip>
            </v-text-field>

            <v-text-field
              class="ma-0"
              label="Password"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              :rules="[rules.pwExists, rules.pwValidate]"
              v-model="password"
              validate-on-blur
              required
            >
              <v-tooltip slot="append-outer" right color="white" :activator="!validepw ? '' : 'awb'">
                <v-icon
                  slot="activator"
                  :color="existspw ? (validepw ? 'green' : 'red') : 'primary'"
                >{{existspw ? (validepw ? 'check' : 'help') : 'help'}}</v-icon>
                <span v-html="pwmessage"></span>
              </v-tooltip>
            </v-text-field>

            <v-text-field
              class="ma-0"
              label="Confirmar Password"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              :rules="[rules.pwConfirmationExists, rules.pwConfirmationValidate]"
              required
            >
              <v-tooltip slot="append-outer" right color="white" :activator="!validepwC ? '' : 'awb'">
                <v-icon
                  slot="activator"
                  :color="existspwC ? (validepwC ? 'green' : 'red') : 'primary'"
                >{{existspwC ? (validepwC ? 'check' : 'help') : 'help'}}</v-icon>
                <span>
                  <font color="black">As passwords tem de ser iguais</font>
                </span>
              </v-tooltip>
            </v-text-field>

            <v-text-field
              class="ma-0"
              label="Nome"
              v-model="name"
              :rules="[rules.userExists, rules.userValidate]"
              required
            >
              <v-tooltip
                slot="append-outer"
                right
                color="white"
                :activator="existsuser ? (valideuser ? 'awb' : '') : ''"
              >
                <v-icon
                  slot="activator"
                  :color="existsuser ? (valideuser ? 'green' : 'red') : 'primary'"
                >{{existsuser ? (valideuser ? 'check' : 'help') : 'help'}}</v-icon>
                <span>
                  <font color="black">Minimo 6 caracteres</font>
                </span>
              </v-tooltip>
            </v-text-field>

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="ma-0 text-colort"
                  v-model="date"
                  label="Data de nascimento"
                  readonly
                  v-on="on"
                >
                  <v-icon slot="append" color="blue">event</v-icon>
                </v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                no-title
                :max="deltaDate(new Date(), 0, 0, -16).toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>

            <v-text-field
              class="ma-0"
              label="Número de telemóvel"
              v-model="phonenumber"
              :rules="[rules.phoneExists, rules.phoneValidate]"
              required
            >
              <v-tooltip
                slot="append-outer"
                right
                color="white"
                :activator="!validephone ? '' : 'awb'"
              >
                <v-icon
                  slot="activator"
                  :color="existsphone ? (validephone ? 'green' : 'red') : 'primary'"
                >{{existsphone ? (validephone ? 'check' : 'help') : 'help'}}</v-icon>
                <span>
                  <font color="black">Número inválido</font>
                </span>
              </v-tooltip>
            </v-text-field>
            <v-btn
              block
              type="submit"
              color="#FC6600"
              class="white--text"
              :disabled="getAllConfirmations"
            >Register</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import './SignUpPage.scss';
</style>

<script>

import { authenticationService } from "@/_services";
import { router } from '@/_helpers';

export default {
  name: "Register-component",
  data() {
    return {
      errors_name: null,
      errors_pw: null,
      valid: false,
      e1: false,
      validemail: false,
      existsmail: false,
      validepwC: false,
      existspw: false,
      validecalendar: false,
      valideuser: false,
      existsuser: false,
      validepw: false,
      validephone: false,
      existsphone: false,
      existspwC: false,
      phonenumber : "",
      name : "",
      messagei: "",
      pwmessage: "",
      mailmessage: "",
      returnUrl: "",
      password: "",
      rules: {
        emailValidate: value => {
          const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          this.validemail = pattern.test(value);
          return pattern.test(value) || "E-mail inválido";
        },
        emailExists: value => {
          this.existsmail = !!value;
          this.mailmessage = '<font color="black">Ex: mail@mail.com</font>';
          return !!value || "E-mail obrigatório";
        },
        pwValidate: value => {
          const booleanResult =
            !/^[a-zA-Z0-9]+$/.test(value) &&
            /\d/.test(value) &&
            /[a-z]/.test(value) &&
            /[A-Z]/.test(value) &&
            value.length > 5;
          this.validepw = booleanResult;
          this.pwmessagebuilder(value);
          return booleanResult || "Password inválida";
        },
        pwExists: value => {
          this.existspw = !!value;
          return !!value || "Password obrigatória";
        },
        pwConfirmationValidate: value => {
          this.validepwC = this.password == value;
          const booleanResult = value == this.password;
          return booleanResult || "Confirmação inválida";
        },
        pwConfirmationExists: value => {
          this.existspwC = !!value;
          return !!value || "Confirmação obrigatória";
        },
        userValidate: value => {
          this.valideuser = /^.{6,}$/.test(value);
          return /^.{6,}$/.test(value) || "Nome inválido";
        },
        userExists: value => {
          this.existsuser = !!value;
          return !!value || "Nome obrigatório";
        },
        phoneValidate: value => {
          this.validephone = /^([0-9]{9})$/.test(value);
          return /^([0-9]{9})$/.test(value) || "Número inválido";
        },
        phoneExists: value => {
          this.existsphone = !!value;
          return !!value || "Numero obrigatório";
        }
      },
      email: "",
      date: null,
      menu: false
    };
  },
  computed: {
    getAllConfirmations() {
      let allConfirmations = [
        this.validemail,
        this.validepw,
        this.validepwC,
        this.valideuser,
        this.validephone,
        !!this.date
      ];
      let checker = arr => arr.every(v => v === true);
      return !checker(allConfirmations);
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
created() {
    if (authenticationService.currentUserValue) {
      return router.push("/");
    }
        this.returnUrl = this.$route.query.returnUrl || "/";

  },
  methods: {
    submit() {
      authenticationService.register(this.email, this.password, this.name, this.date, this.phonenumber).then(
        user => router.push(this.returnUrl),
        error => { console.log(error); this.error = error; }
      );
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    deltaDate(input, days, months, years) {
      var date = new Date(input);
      date.setDate(date.getDate() + days);
      date.setMonth(date.getMonth() + months);
      date.setFullYear(date.getFullYear() + years);
      return date;
    },
    pwmessagebuilder(password) {
      this.pwmessage = "";
      if (/^[a-zA-Z0-9]+$/.test(password) || !password) {
        this.pwmessage += '<font color="red">✘</font>';
      } else {
        this.pwmessage += '<font color="green">✔</font>';
      }
      this.pwmessage +=
        '<font color="black"> Pelo menos um caracter alfanumérico.</font> <br/>';

      if (!/\d/.test(password)) {
        this.pwmessage += '<font color="red">✘</font>';
      } else {
        this.pwmessage += '<font color="green">✔</font>';
      }
      this.pwmessage +=
        '<font color="black"> Pelo menos um número (0-9).</font> <br/>';

      if (!/[a-z]/.test(password)) {
        this.pwmessage += '<font color="red">✘</font>';
      } else {
        this.pwmessage += '<font color="green">✔</font>';
      }
      this.pwmessage +=
        '<font color="black"> Pelo menos uma letra minuscula (a-z).</font> <br/>';

      if (!/[A-Z]/.test(password)) {
        this.pwmessage += '<font color="red">✘</font>';
      } else {
        this.pwmessage += '<font color="green">✔</font>';
      }
      this.pwmessage +=
        '<font color="black"> Pelo menos uma letra maiuscula (A-Z).</font> <br/>';

      if (password.length < 6) {
        this.pwmessage += '<font color="red">✘</font>';
      } else {
        this.pwmessage += '<font color="green">✔</font>';
      }
      this.pwmessage += '<font color="black"> Minímo 6 caracteres. </font>';
    }
  }
};
</script>
