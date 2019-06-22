<template>
  <div class="RoleUpdate">
      <v-layout column align-center justify-center style="margin-top:100px">
    <v-flex
      xs6
      sm4
      md3
      xl2
      class="lg5-custom"
      v-for="(user, idx) in users"
      v-bind:key="idx"
    >{{user.name}}
    <v-select
    
    :disabled="disable"
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
      current_user:null,
      disable:false,
      roles: ['Admin','User','Vet']
    };
  },

  methods: {updateRole(role, user){
      if (!(this.currentUser.role == user.role)){
      this.disable = true;
      userService.updateRole(role, user.id).then(this.disable = false);
      }
  }},
  mounted() {},
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    userService.getAll().then(users => (this.users = users));
  }
};
</script>
