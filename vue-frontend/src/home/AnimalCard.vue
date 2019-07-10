<template>
  <div class="animal-card-component">
    <v-card tile :class="isAdmin ? '' : 'applyZoom'" >
      <router-link :to="{ name: 'AnimalProfile', params: { animalList, id, url_id } }">
        <v-img :src="animalList[id].image" height="250px"></v-img>
      </router-link>
      <v-card-title primary-title class="ma-0 pa-0 justify-center">
        <div>
          <h3 class="card-tile" style="margin-top:10px;font-size: 14px;line-height: 1.0;font-weight: bold;">{{animalList[id].name}}</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span
          style="position:absolute;right:0;top:0;">

          <router-link v-if="adminMode" :to="{ name: 'AnimalCrud', params:{animalObj:animalList[id]}}">
          <v-btn icon color="blue" flat>
              <v-icon>fas fa-edit</v-icon>
          </v-btn>
          </router-link>
        </span>
        <span
          style="position:absolute;right:0;bottom:0;margin-right:5px;font-size:18px;"
          :style="animalList[id].gender == 1 ? 'color:dodgerblue' : 'color:#E75480'"
        >
          <i :class="animalList[id].gender == 1 ? 'fas fa-mars' : 'fas fa-venus'"></i>
        </span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>
    @import './AnimalCard.scss';
</style>

<script>
import { authenticationService, animalService, userService } from "@/_services";
import { router, Role } from "@/_helpers";
import { constants } from 'crypto';

export default {
  adminMode:false,
  props: ["animalList","id"],
  name: "Animal-card-component",
  data() {
    return {
      url_id:null,
      animal:null,
      currentUser: null
    };
  },

  methods: {

  },

  computed:{
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;      
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.adminMode = this.currentUser && this.currentUser.role === Role.Admin;
    this.url_id = this.animalList[this.id]._id;
  }
};
</script>
