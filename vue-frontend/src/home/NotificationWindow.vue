<template>
  <div class="text-xs-center">
    <!-- <v-dialog v-model="dialog" scrollable max-width="300px"> -->
    <v-menu bottom offset-y v-if="currentUser">
      <template v-slot:activator="{ on }">
        <span class="nav-item nav-link specialCursor" v-on="on">
          <div class="icon-wrapper">
            <i
              class="fas fa-envelope mr-3"
              style="width:20px; height:20px; margin-right:0px !important;"
            ></i>
            <span v-if="unreadNotifications != 0" class="badge">{{unreadNotifications}}</span>
          </div>
        </span>
      </template>
      <v-card width="300" style="margin-top:20px" v-if="myNotifications == 0">
          <v-card-actions>
            Não existem notificações
        </v-card-actions>
      </v-card>
      <v-card width="300" style="margin-top:20px" v-if="myNotifications != 0">
        
        <v-card-actions>
          <!-- <v-btn color="#f4f4f4" @click="readAllNotifications()">Ler todas</v-btn> -->
          <v-btn color="black" flat @click="dialog = false">Fechar</v-btn>
        </v-card-actions>

      <v-card class="scroll" max-height="300px" >
        <span v-for="(item, i) in myNotifications" :key="i">
          <v-card
            :class="!item.read ? 'specialCursor applyZoom' : ''"
            :style="item.read ? 'background-color:white' : 'background-color:#dcdcdc'"
          >
            <span>
              <v-layout>
                <v-flex>
                  <v-card-text style="font-size:12px;padding-top:7px;padding-bottom:7px" @click="readNotification(item._id, item)">
                    <p v-if="item.read" style="font-size:16px;margin-bottom:10px;">{{item.title}}</p>
                    <p v-else style="font-size:16px;font-weight:bold;margin-bottom:10px;">{{item.title}}</p>
                    {{item.message}}
                  </v-card-text>
                  <span
                    style="position:absolute;right:0;bottom:5px;margin-right:5px;font-size:10px;"
                  >{{item.date}}</span>
                  <span
                    style="position:absolute;right:0;top:0;padding:0;">
                    <v-btn flat icon @click="deleteNotification(item._id)">
                    <font-awesome-icon icon="trash" size="1x"/>
                    </v-btn>
                    </span>
                </v-flex>
              </v-layout>
            </span>
          </v-card>
        </span>
      </v-card>
      </v-card>
    </v-menu>
  </div>
</template>

<style lang="sass" scoped>
    @import './NotificationWindow.scss';
</style>

<script>
import { authenticationService, userService, notificationService } from "@/_services";
import { router, Role } from "@/_helpers";
import { constants } from 'crypto';

export default {
  name: "NotificationWindow",
  data() {
    return {
      currentUser: null,
      dialog: false,
      unreadNotifications: 0,
      myNotifications: [],
      index:null
    };
  },
  methods: {
    deleteNotification(notificationId){
      
      let vm = this;

      notificationService.deleteNotification(this.currentUser.id, notificationId);
      this.myNotifications = [];

      setTimeout(function() {userService.getById(vm.currentUser.id).then(x => {
        vm.currentUser = x;
        vm.myNotifications = x.notifications.reverse();
        vm.unreadNotifications = x.notifications.filter(
        notification => !notification.read
      ).length;
      })}, 100);
    },
    readNotification(notificationId, item) {

      let vm = this;

      notificationService.readNotification(this.currentUser.id, notificationId);
      this.myNotifications = [];

      setTimeout(function() {userService.getById(vm.currentUser.id).then(x => {
        vm.currentUser = x;
        vm.myNotifications = x.notifications.reverse();
        vm.unreadNotifications = x.notifications.filter(
        notification => !notification.read
      ).length;
      })}, 100);
      
    },
    readAllNotifications() {
      let vm = this;
      let userId = this.currentUser.id;
      console.log(this.currentUser.notifications);
      this.currentUser.notifications.forEach(element => {
        notificationService.readNotification(this.currentUser.id, element._id);
        console.log('here');
        console.log(element._id, this.currentUser.id);
      });
      
      this.myNotifications = [];

      setTimeout(function() {userService.getById(vm.currentUser.id).then(x => {
        vm.currentUser = x;
        vm.myNotifications = x.notifications.reverse();
        vm.unreadNotifications = x.notifications.filter(
        notification => !notification.read
      ).length;
      })}, 100);
      console.log(this.currentUser.notifications);
    },
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
    userService.getById(this.currentUser.id).then(x => {
      this.currentUser = x;
      this.unreadNotifications = x.notifications.filter(
        notification => !notification.read
      ).length;
      this.myNotifications = x.notifications.reverse();
    });

  }
};
</script>
