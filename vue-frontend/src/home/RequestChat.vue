<template>
  <v-card>
    
    <v-alert :value="true" color="warning" outline icon="warning"
    v-if="petsChat.length == 0" >
      Não existem conversas
    </v-alert>

    <v-tabs
      v-model="active_tab"
      v-if="petsChat.length > 0"
      background-color="deep-purple accent-4"
      dark
      fixed-tabs
      show-arrows
      height="200"
    >
      <v-tab v-for="(petChat, index) in petsChat" :key="index">
        <v-card
          height="160px"
          :color="active_tab == index ? '#535353' : '#424242'"
          @click="resetUser()"
        >
          <v-layout>
            <v-flex>
              <v-img height="160px" width="112px" :src="petChat.image"></v-img>
            </v-flex>
            <v-flex>
              <v-card-title>{{petChat.name}}</v-card-title>
              <v-card-text>
                <span
                  style="position:absolute;right:0;bottom:0;margin-right:5px;font-size:18px;"
                  :style="petChat.gender == 1 ? 'color:dodgerblue' : 'color:#E75480'"
                >
                  <i :class="petChat.gender == 1 ? 'fas fa-mars' : 'fas fa-venus'"></i>
                </span>
                <p>{{petChat.breed_name}}</p>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab>

      <v-tabs-items>
        <v-tab-item v-for="(petChat, index) in petsChat" :key="index">
          <div class="tab-item-wrapper">
            <v-layout fill-height style="min-height:600px">
              <v-flex shrink>
                <h5>Candidatos</h5>
                <v-layout column v-for="chat in petChat.chat_windows" :key="chat._id">
                  <v-chip
                    outline
                    selected
                    color="primary"
                    class="tablinks"
                    :id="chat._id + '_b'"
                    @click="openTab(chat._id, chat.user, chat.messages)"
                  >
                    <v-avatar>
                      <img src="https://via.placeholder.com/25" :alt="chat.user.name" />
                    </v-avatar>
                    {{chat.user.name}}
                  </v-chip>
                  <!-- <v-btn class="tablinks" :id="chat._id + '_b'" @click="openTab(chat._id)">{{chat.user.name}}</v-btn> -->
                </v-layout>
              </v-flex>
              <v-flex>
                <v-layout fill-height>
                  <div
                    v-for="chat in petChat.chat_windows"
                    :key="chat._id"
                    :id="chat._id"
                    class="tabcontent"
                    style="display:none"
                  >
                    <span style="font-size:22px">A falar com {{chat.user.name}}</span>
                    <span style="font-size:12px">({{chat._id}})</span>
                    <v-card>
                      <v-alert :value="true" color="info" outline icon="info" v-if="!visible_messages">
                        Sem mensagens, nada para ver aqui!
                      </v-alert>
                      <v-container style="height: 380px;" class="scroll-y" id="scroll-target">
                        <v-card-text v-html="visible_messages"  >
                        </v-card-text>
                      </v-container>
                    </v-card>
                    <v-form ref="form" style="margin-bottom:0;">
                      <v-layout row wrap>
                      <v-flex xs12 sm10 >
                      <v-textarea
                      style="padding-left:20px;padding-right:20px;padding-bottom:20px; ma-0 pa-0"
                      label="Message"
                      counter
                      class="mb-0 pa-0;"
                      maxlength="700"
                      no-resize
                      auto-grow
                      v-model="form.message"
                      ></v-textarea>
                      </v-flex>
                      <v-flex xs12 sm2 style="padding:20px">
                      <v-btn :disabled="!formIsValid" @click="sendMessage(chat._id, chat)" block flat color="primary" style="height:100%">Submit</v-btn>
                      </v-flex>
                      </v-layout>
                    </v-form>
                  </div>
                </v-layout>
              </v-flex>
              <v-flex md2>
                <v-layout v-if="selected_user">
                  <v-container>
                    <div class="justify-center">
                      <v-img
                        style="height:160px;width:112px;max-width:112px;margin:auto;"
                        src="https://via.placeholder.com/150"
                      ></v-img>
                    </div>
                    <v-divider></v-divider>
                    <v-flex shrink>
                      <div class="subheading">{{selected_user.name}}</div>
                      <div class="body-1">{{selected_user.email}}</div>
                      <div class="body-1">{{selected_user.phonenumber}}</div>
                    </v-flex>
                  </v-container>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>
<style lang="sass" scoped>
    @import './RequestChat.scss';
</style>


<script>
import { authenticationService } from "@/_services";
import { chatService } from "@/_services";
import { constants } from "crypto";

export default {
  name: "AnimalRequests",
  data() {
    const defaultForm = Object.freeze({
      message: ""
    });

    return {
      form: Object.assign({}, defaultForm),
      active_tab: 0,
      chatCount: 0,
      currentUser:null,
      petsChat: [],
      usersChat: [],
      selected_user: null,
      visible_messages:'',
      cur_chatId: null
    };
  },
  methods: {
    sendMessage(current_chatId, current_chat) {
      chatService
        .sendMessage(
          current_chatId,
          this.form.message,
          this.currentUser.id
        ).then(new_message => {
            current_chat.messages.push(new_message);
            this.updateVisibleMessages(current_chat.messages,current_chat.user._id);
            var textarea = document.getElementById("scroll-target");
                textarea.scrollTop = textarea.scrollHeight;
        }
        );
        this.form.message = '';
    },
    resetUser() {
      this.selected_user = null;
    },
    updateVisibleMessages(messages, user){
        this.visible_messages = '';
        messages.forEach(element => {
        element.sender != this.currentUser.id ?
        this.visible_messages += 
        '<p style="text-align:left;font-size:10px;margin-bottom: 5px;">' 
        + user.name + 
        '</p><div style="text-align:left;margin-bottom: 10px;">'
        +'<span style="background: #f1f0f0; border-radius: 8px; padding: 8px; margin: 2px 8px 5px 0; "> '
        +  element.message + '</span><p style="text-align:left;font-size:10px;margin-top: 5px; color:#c1c1c1">' 
        + element.date + 
        '</p></div>'
         : this.visible_messages += 
        '<p style="text-align:right;font-size:10px;margin-bottom: 5px;">' 
        + this.currentUser.name + 
        '</p><div style="text-align:right;margin-bottom: 10px;">'
        +'<span style="background: #0084ff; border-radius: 8px; padding: 8px; margin: 2px 8px 5px 0; color:white"> '
        +  element.message + '</span><p style="text-align:right;font-size:10px;margin-top: 5px; color:#c1c1c1">' 
        + element.date + 
        '</p></div>'
      });
    },
    openTab(chatId, user, messages) {

      this.cur_chatId = chatId;
      this.selected_user = user;

      this.updateVisibleMessages(messages, user);
      
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      document.getElementById(chatId).style.display = "block";
    }
  },
  mounted() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    chatService.getAll().then(petsChat =>
      petsChat.forEach(element => {
        element.chat_windows = [];
        element.chats.forEach(chatId => {
          chatService
            .getChatById(chatId)
            .then(chat => element.chat_windows.push(chat));
        });
        this.petsChat.push(element);
      })
    );
  },
  computed: {
    formIsValid() {
      return this.form.message;
    }
  },
  updated: function () {
  this.$nextTick(function () {
    var textarea = document.getElementById("scroll-target");
        textarea.scrollTop = textarea.scrollHeight;
  })
}
};
</script>