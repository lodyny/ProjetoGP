<template>
  <div class="UserProfile">
    <v-container  >
      <v-layout row wrap>
      <v-flex xs8>
    <h2>My requests</h2>
    <v-timeline>
      <v-timeline-item
        v-for="request in this.currentUser.requests"
        :key="request._id"
        color="red lighten-2"
        large
      >
        <template v-slot:opposite>
          <img :src="request.animal.image" 
          v-if="request.state == 'Accepted'"
          height="100px">
          <span v-if="request.state != 'Accepted'">{{request.state}}</span>
          <p><span v-if="request.state != 'Accepted'">{{request.date}}</span></p>
        </template>
        <template v-slot:icon>
          <v-avatar>
          <img :src="request.animal.image"
          v-on="on"
          class="specialCursor"
          v-if="request.state != 'Accepted'">
          <img src="https://res.cloudinary.com/adotaqui/image/upload/v1562709461/check.png"
          v-if="request.state == 'Accepted'">
        </v-avatar>
        </template>
        <v-card>
          <v-card-title class="title breaker">Adoção de {{request.animal.name}} &nbsp;<span v-if="request.state == 'Accepted'">({{request.state}})</span></v-card-title>
          <v-card-text class="white text--primary">
            <p class="breaker">{{request.details}}.</p> 
            <v-btn class="mx-0" v-if="request.state == 'Pending'">Go to chat</v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
      </v-flex>
    
    <v-layout justify-center style="margin-top:100px" >
      <v-form @submit.prevent="submit">
        <img v-if="currentUser.image" :src="currentUser.image">
        <img v-else src="https://via.placeholder.com/150">
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
        <v-text-field
          class="ma-0"
          label="Número de telemóvel"
          v-model="phonenumber"
          :rules="[rules.phoneExists, rules.phoneValidate]"
          required
        >
          <v-tooltip slot="append-outer" right color="white" :activator="!validephone ? '' : 'awb'">
            <v-icon
              slot="activator"
              :color="existsphone ? (validephone ? 'green' : 'red') : 'primary'"
            >{{existsphone ? (validephone ? 'check' : 'help') : 'help'}}</v-icon>
            <span>
              <font color="black">Número inválido</font>
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
        <v-btn block type="submit" color="#FC6600" class="white--text">Save</v-btn>
      </v-form>
    </v-layout>
    </v-layout>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './UserProfile.scss';
</style>

<script>
import { authenticationService, userService } from "@/_services";
import { router, Role } from "@/_helpers";

export default {
  name: "UserProfile",
  components: {},
  data() {
    return {
      localUser: null,
      currentUser: null,
      validephone: false,
      existsphone: false,
      valideuser: false,
      existsuser: false,
      dialog : false,
      dialog2 : false,
      name: "",
      phonenumber: "",
      menu: false,
      date: null,
      user: [],
      rules: {
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
      }
    };
  },

  methods: {},
  mounted() {},
  computed: {
    // getAllConfirmations() {
    // let allConfirmations = [
    //   this.validemail,
    //   this.existsmail,
    //   this.existspassword
    // ];
    // let checker = arr => arr.every(v => v === true);
    // return !checker(allConfirmations);
    // },
    initialDate: {
      get() {
        var date = new Date();
        date.setDate(date.getDate());
        date.setMonth(date.getMonth());
        date.setFullYear(date.getFullYear() - 16);
        return date;
      }
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));

    userService.getById(this.currentUser.id).then(x => {
      this.user = x;
      this.name = x.name;
      this.phonenumber = x.phonenumber;
      this.currentUser = x;
    });
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    deltaDate(input, days, months, years) {
      var date = new Date(input);
      date.setDate(date.getDate() + days);
      date.setMonth(date.getMonth() + months);
      date.setFullYear(date.getFullYear() + years);
      return date;
    },
    save(date) {
      this.$refs.menu.save(date);
    }
  }
};
</script>
