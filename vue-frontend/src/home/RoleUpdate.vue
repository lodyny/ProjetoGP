<template>
  <div class="RoleUpdate">
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
      <v-layout column align-center justify-center style="margin-top:100px">
    <v-flex
      xs6
      sm4
      md3
      xl2
      class="lg5-custom"
      v-for="(user, idx) in users"
      v-bind:key="idx"
    >
    {{user.name}}
    <v-select
    
    :disabled="isDisabled(user.id)"
    style="padding-left:20px;padding-right:20px;margin-top:30px;"
    v-model="user.role"
    :items="roles"
    label="Role"
    @change="updateRole(user.role, user)"
    ></v-select>
    </v-flex>
      </v-layout>
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
