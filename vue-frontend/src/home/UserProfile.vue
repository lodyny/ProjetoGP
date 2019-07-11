<template>
  <div class="UserProfile">
    <v-snackbar
      v-model="snackbar"
      color="success"
      :timeout="timeout"
      style="margin-top:50px; z-index:1"
      top
      right
    >
      {{message}} com sucesso
      <v-btn flat @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
    <v-container  >
      <v-layout row wrap>
      <v-flex xs8 v-if="currentUser.requests.length > 0">
    <h2>Meus pedidos</h2>
    <v-timeline >
      <v-timeline-item
        v-for="request in currentUser.requests"
        :key="request._id"
        color="red lighten-2"
        large
      >
        <template v-slot:opposite>
          <img :src="request.animal.image" 
          v-if="request.state == 'Aceite' || request.state == 'Recusado'" 
          height="100px">
          
          <!-- <span v-if="request.state == 'Pending'">{{request.state}}</span> -->
          <p><span v-if="request.state == 'Pendente'">{{request.date}}</span></p>
        </template>
        <template v-slot:icon>
          <v-avatar>
          <img :src="request.animal.image"
          v-if="request.state == 'Pendente'">

          <img src="https://res.cloudinary.com/adotaqui/image/upload/v1562709461/check.png"
          v-if="request.state == 'Aceite'">
          <img src="https://res.cloudinary.com/adotaqui/image/upload/v1562709461/crossed.png"
          v-if="request.state == 'Recusado'">
          <img src="https://res.cloudinary.com/adotaqui/image/upload/v1562709461/returned.png"
          v-if="request.state == 'Devolvido'">
        </v-avatar>
        </template>
        <v-card>
          <v-card-title class="title breaker">Adoção de {{request.animal.name}} &nbsp;({{request.state}})</v-card-title>
          <v-card-text class="white text--primary">
            <p class="breaker">{{request.details}}.</p> 
            <v-btn class="mx-0" v-if="request.chat" @click="redirectToChat(request.animal._id)">Go to chats</v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
      </v-flex>
    
    <v-layout justify-center  >
      <v-form @submit.prevent="submit">
        <h2>Minha informação</h2>
        <img v-if="initialImage" :src="initialImage" style="max-width:300px">
        <img v-if="!initialImage" src="https://via.placeholder.com/150">
        <input type="file" ref="file" style="display: none" @change="onFileChange">
        <v-btn v-if="initialImage" @click="removeImage" block color="#FC6600" class="white--text">Change picture</v-btn>
        <v-btn v-if="!initialImage" @click="$refs.file.click()" block color="#FC6600" class="white--text">Attach picture</v-btn>

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
          <template v-slot:activator="{ ondate }">
            <v-text-field
              class="ma-0 text-colort"
              v-model="date"
              label="Data de nascimento"
              readonly
              v-on="ondate"
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
        <v-btn block @click="saveClick()" color="#FC6600" class="white--text">Save</v-btn>
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
import { constants } from 'crypto';

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
      message: "",
      timeout: 2000,
      snackbar: false,
      file: [],
      initialImage: "",
      onzoom: false,
      ondate: false,
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
  mounted() {
  },
  computed: {
    getAllConfirmations() {
    let allConfirmations = [
      this.valideuser,
      this.existsuser,
      this.validephone,
      this.existsphone
    ];
    let checker = arr => arr.every(v => v === true);
    return checker(allConfirmations);
    },
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
      this.initialImage = x.image;
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
    deploySnackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
    saveClick(){
      if(this.getAllConfirmations){
			var formdata = new FormData();
			formdata.append('file', this.file);
			formdata.append('cloud_name', 'adotaqui');
			formdata.append('upload_preset', 'ormfeeku');
			
			var xhr = new XMLHttpRequest();
			xhr.open('POST', "https://api.cloudinary.com/v1_1/adotaqui/image/upload",true);

      const userData = { 
            name: this.name,
            phonenumber: this.phonenumber,
            birthdate: this.date
          };
      let vm = this;
			xhr.onload = function () {
      if (this.status == 200 && this.responseText){ 
        const responseObj = JSON.parse(this.responseText);
            userData.image = responseObj.url;
          }
      userService.updateUser(vm.currentUser.id, userData);
      vm.deploySnackbar("Update de utilizador");
      }
		xhr.send(formdata);		
      }
    },
    deltaDate(input, days, months, years) {
      var date = new Date(input);
      date.setDate(date.getDate() + days);
      date.setMonth(date.getMonth() + months);
      date.setFullYear(date.getFullYear() + years);
      return date;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
     redirectToChat(animalId){
        this.$router.push({
              name: "Myconversations",
              params: { 'animalId': animalId }
            });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.file = files[0];
      if (!files.length) return;
      this.createImage(this.file);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.initialImage = e.target.result;
      };
      reader.readAsDataURL(file);
  },
  removeImage: function(e) {
      this.initialImage = "";
    }
  }
};
</script>
