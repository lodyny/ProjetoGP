<template>
  <div class="AnimalRequests">
      <v-snackbar
      v-model="snackbar"
      color="success"
        :timeout=timeout
      style="margin-top:50px; z-index:1"
      top
      right
    >
      {{message}} Success
      <v-btn
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-card>
      <v-card-title>
        <h1>Animal Requests</h1>
        <v-spacer></v-spacer>
        <div>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style="padding-top: 0px; margin-right:10px"
          ></v-text-field>
        </div>
        <v-btn
          color="warning"
          dark
          @click="expand = !expand"
        >{{ expand ? 'Keep' : 'Close' }} other rows</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="usersList"
        :search="search"
        :pagination.sync="pagination"
        :expand="expand"
        item-key="_id"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>
                <v-icon
                medium
                @click.native.stop
                @click="deleteRequest(props.item.userId, props.item._id)"
              >delete</v-icon>
            </td>
            <td class="text-xs-left grey lighten-4">{{ props.item.name }}</td>
            <td class="text-xs-left">
              {{ props.item.animal.name }}
              <span
                :style="props.item.animal.gender == 1 ? 'color:dodgerblue' : 'color:#E75480'"
              >
                <i :class="props.item.animal.gender == 1 ? 'fas fa-mars' : 'fas fa-venus'"></i>
              </span>
            </td>
            <td class="text-xs-left grey lighten-4">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
            <td class="align-center layout px-0" v-if="props.item.state == 'Pending'">
              <v-icon
                medium
                class="mr-2"
                @click.native.stop
                @click="refuseRequest(props.item.userId, props.item._id, props.item.animal)"
              >close</v-icon>
              <v-icon
                medium
                v-if="!props.item.animal.owner"
                @click.native.stop
                @click="acceptRequest(props.item.userId, props.item._id, props.item.animal)"
              >check</v-icon>
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-container grid-list-xl>
            <v-layout justify-space-between row fill-height>
              <v-flex d-flex md7> 
                <v-card height="160px">
                  <v-layout>
                    <v-flex xs3>
                      <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on }">
                          <v-img :src="props.item.animal.image" class="specialCursor" height="160px" style="min-width:112px" v-on="on"></v-img>
                        </template>
                        <v-card>
                          <v-img :src="props.item.animal.image" contain aspect-ratio="1"></v-img>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                    <v-flex>
                      <v-card-text>
                        <h4>
                          <p>Request details:</p>
                        </h4>
                        <v-container id="scroll-target" style="max-height: 90px; padding:0px;" class="scroll-y">
                        {{props.item.details}}
                        </v-container>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md7>
                <v-card height="160px" >
                  <v-layout>
                    <v-flex xs3 >
                      <!-- <v-img :src="props.item.animal.image"></v-img> -->
                      <v-img height="160px" style="min-width:112px" src="https://via.placeholder.com/150"></v-img>
                    </v-flex>
                    <v-flex>
                      <v-card-text>
                        <h4>
                          <p>Candidate details:</p>
                        </h4>
                        <a :href="'mailto:' + props.item.userEmail">{{props.item.userEmail}}</a>
                        <p>{{props.item.userPhone}}</p>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>
    @import './AnimalRequests.scss';
</style>

<script>
import { authenticationService, userService, animalService } from "@/_services";

export default {
  name: "AnimalRequests",
  data() {
    return {
      usersList: [],
      timeout: 2000,
      expand: false,
      snackbar : false,
      message: "",
      dialog: false,
      tempOwner: null,
      search: "",
      pagination: {
        sortBy: "state",
        ascending: true,
        rowsPerPage: 25
      },
      headers: [
        { text: "Delete", value: "delete", width: "1px" },
        { text: "User", value: "name" },
        { text: "Animal", value: "animal" },
        { text: "Date", value: "date" },
        { text: "State", value: "state" },
        { text: "Actions", width: "1px" }
      ]
    };
  },

  methods: {
    acceptRequest(userId, requestId, animal) {
      animalService.acceptAnimalRequest(userId, requestId).then(x => {
        if (x.success) {
          this.updateInfo(requestId, animal);
          this.deploySnackbar("Accepted");
        }
      });
    },
    refuseRequest(userId, requestId, animal) {
      animalService.refuseAnimalRequest(userId, requestId).then(x => {
        if (x.success) {
          this.updateInfo(requestId, animal);
          this.deploySnackbar("Refused");
        }
      });
    },
    deleteRequest(userId, requestId){
    animalService.deleteAnimalRequest(userId, requestId).then(
        x => {
        if (x.success) {
            this.usersList = [];
          userService.getAll().then(x => {
            x.forEach(element => {
                element.requests.forEach(request => {
                request.name = element.name;
                request.userId = element.id;
                request.userEmail = element.email;
                request.userPhone = element.phonenumber;
                this.usersList.push(request);
                });
            });
            })
        }
      }
    );
    },
    deploySnackbar(message) {
          this.message = message;
          this.snackbar = true;
    },
    updateInfo(requestId, animal) {
      userService.getAll().then(x => {
        x.forEach(element => {
          element.requests.forEach(request => {
            if (request._id == requestId){
            request.name = element.name;
            request.userId = element.id;
            request.userEmail = element.email;
            request.userPhone = element.phonenumber;
            this.tempOwner = request.animal.owner;
            console.log(this.tempOwner);
            this.usersList = this.usersList.filter(elem => elem._id != requestId);
            this.usersList.push(request);
            }
          })
        })  
      }).then(() => {
            this.usersList.forEach(elem => {
                if(elem.animal._id == animal._id){
                    console.log('elem owner', elem.animal.owner);
                    console.log('this owner', this.tempOwner);
                    elem.animal.owner = this.tempOwner;
                    console.log(elem.animal.owner);
                }
            }
            )}
          );
    }
  },
  mounted() {},
  created() {
    userService.getAll().then(x => {
      x.forEach(element => {
        element.requests.forEach(request => {
          request.name = element.name;
          request.userId = element.id;
          request.userEmail = element.email;
          request.userPhone = element.phonenumber;
          this.usersList.push(request);
        });
      });
    });
  }
};
</script>
