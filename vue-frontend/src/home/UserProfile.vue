<template>
    <div class="UserProfile">
      <v-layout  justify-center style="margin-top:100px"
      xs6
          sm4
          md3
          xl2>
    
        <v-form @submit.prevent="submit" >
            
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
            <v-btn
                block
                type="submit"
                color="#FC6600"
                class="white--text"
              >Login</v-btn>
        </v-form>
      </v-layout>
    </div>
</template>

<style lang="sass" scoped>
    @import './UserProfile.scss';
</style>

<script>
import { authenticationService, userService } from "@/_services";
import { router, Role } from "@/_helpers";

export default {
    name: 'UserProfile',
    components: {
  },
    data() {
        return {
            localUser: null,
            currentUser: null,
            validephone: false,
            existsphone: false,
            valideuser: false,
            existsuser: false,
            name: '',
            phonenumber:'',
            menu: false,
            date:null,
            user : [],
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
            },
        };
    },
    
    methods: {
        
    },
    mounted() {
        
    },
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
    },
    
    },
    created() {
        authenticationService.currentUser.subscribe(x => (this.currentUser = x));
        
        // console.log('current user', this.currentUser);
        userService.getById(this.currentUser.id).then(
          x => {
            this.user = x;
            this.name = x.name;
            this.phonenumber = x.phonenumber;
            console.log(x);}
          );

        // console.log('local',this.localUser);
        // // });
        // console.log(this.currentUser);
        
    },
    watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods : {
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
