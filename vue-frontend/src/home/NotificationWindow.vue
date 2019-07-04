<template>
  <div class="text-xs-center">
    <!-- <v-dialog v-model="dialog" scrollable max-width="300px"> -->
    <v-menu bottom offset-y>
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
      <v-card width="300" style="margin-top:20px">
        
        <v-card-actions>
          <v-btn color="#f4f4f4" @click="readAllNotifications()">Mark all as read</v-btn>
          <v-btn color="black" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>

      <v-card class="scroll" max-height="300px" >
        <span v-for="(item, i) in myNotifications" :key="i">
          <v-card
            :class="!item.read ? 'specialCursor applyZoom' : ''"
            :style="item.read ? 'background-color:white' : 'background-color:#f4f4f4'"
            @click="readNotification(item)"
          >
            <span>
              <v-layout>
                <v-flex>
                  <v-card-text style="font-size:12px;padding-top:7px;padding-bottom:7px">
                    <p style="font-size:16px;font-weight:bold;margin-bottom:10px;">{{item.title}}</p>
                    {{item.message}}
                  </v-card-text>
                  <span
                    style="position:absolute;right:0;bottom:5px;margin-right:5px;font-size:10px;"
                  >{{item.date}}</span>
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
import { authenticationService } from "@/_services";
import { router, Role } from "@/_helpers";

export default {
  name: "NotificationWindow",
  data() {
    return {
      currentUser: null,
      dialog: false,
      unreadNotifications: 0,
      myNotifications: []
    };
  },
  methods: {
    readNotification(val) {
      console.log(val);
    },
    readAllNotifications() {
      this.dialog = false;
    }
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
    }
  },
  watch: {
    currentUser: function(val) {
      this.unreadNotifications = val.notifications.filter(
        notification => !notification.read
      ).length;
      this.myNotifications = val.notifications;
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }
};
</script>
