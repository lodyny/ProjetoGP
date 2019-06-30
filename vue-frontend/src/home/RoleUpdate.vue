<template>
  <div class="RoleUpdate" style="padding-bottom:100px">
    <v-snackbar
      v-model="snackbar"
      color="success"
        timeout="2000"
      style="margin-top:50px; z-index:1"
      top
      right
    >
      Update Success
      <v-btn
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-container grid-list-xl>
      <v-layout row wrap align-center justify-center style="margin-top:100px">
    <v-flex
      v-for="(user, idx) in users"
      v-bind:key="idx"
    >
    <v-card tile width="240px" style="margin:auto">

      <v-card-title primary-title>
        <div>
          <div class="headline">{{user.name}}</div>
          <span class="grey--text">{{user.email}}</span>
        </div>
      </v-card-title>
  <v-img
          src="https://via.placeholder.com/150"
          height="200px"
        >
        </v-img>
    <v-select
    
    :disabled="isDisabled(user.id)"
    style="padding-left:20px;padding-right:20px;margin-top:30px;"
    v-model="user.role"
    :items="roles"
    label="Role"
    @change="updateRole(user.role, user)"
    ></v-select>
    </v-card>
    </v-flex>
      </v-layout>
      </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './RoleUpdate.scss';
</style>

<script>
import { authenticationService, userService } from "@/_services";
import { router, Role } from "@/_helpers";
import { userInfo } from 'os';
import { constants } from 'crypto';

export default {
  name: "RoleUpdate",
  data() {
    return {
      users: null,
      currentUser:null,
      disable:false,
      snackbar : false,
      roles: ['Admin','User','Vet']
    };
  },
  computed:{
    
  },
  methods: {
    updateRole(newRole, selectedUser){
      this.snackbar = true;
      if (!(newRole == selectedUser.role)){
      this.disable = true;
      userService.updateRole(newRole, selectedUser.id).then(this.disable = false);
      }
    },
      isDisabled(id){
      return this.disable || id == this.currentUser.id;
    }
  },
  mounted() {},
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    userService.getAll().then(users => (this.users = users));
    console.log(this.currentUser);
  }
};
</script>
