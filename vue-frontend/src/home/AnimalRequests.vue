<template>
  <div class="AnimalRequests">
    <v-snackbar
      v-model="snackbar"
      color="success"
      :timeout="timeout"
      style="margin-top:50px; z-index:1"
      top
      right
    >
      {{message}} Sucesso
      <v-btn flat @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
    <v-dialog
      width="500"
      v-model="deleteDialog"
    >
    <v-card>
      <v-toolbar color="blue" dense flat>
        <v-toolbar-title class="white--text">Confirmar apagar pedido</v-toolbar-title>
      </v-toolbar>
      <v-card-text><p>Está prestes a apagar um pedido</p>
      <p>O animal correspondente será retornado à lista principal. O pedido sobre o animal e chat serão apagados</p></v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" flat="flat" @click="deleteRequest()">Sim</v-btn>
        <v-btn color="grey" flat="flat" @click="deleteDialog = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>

    <v-card>
      <v-card-title>
        <h1>Pedidos de adoção</h1>
        <v-spacer></v-spacer>
        <div>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Pesquisar"
            single-line
            hide-details
            style="padding-top: 0px; margin-right:10px"
          ></v-text-field>
        </div>
        <v-btn
          color="warning"
          dark
          @click="expand = !expand"
        >{{ expand ? 'Manter' : 'Fechar' }} multiplas linhas</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="newList"
        :search="search"
        :pagination.sync="pagination"
        :expand="expand"
        item-key="_id"
      >
        <template slot="headers">
          <tr>
            <th style="width:1px">Apagar</th>
            <th>Utilizador</th>
            <th>Animal</th>
            <th>Data de pedido</th>
            <th style="width:200px">
              <v-select
                @change="stateChange"
                flat
                hide-details
                small
                multiple
                clearable
                :items="filters"
              ></v-select>
            </th>
            <th style="width:1px">Acções</th>
          </tr>
        </template>
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>
  
         <v-icon
                medium
                @click.stop="deleteDialog = true, selectProp(props.item.userId, props.item._id, props.item.animal._id, props.item.state)"
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
            <td class="align-center layout px-0">
              <v-icon
                medium
                class="mr-2"
                v-if="props.item.state == 'Pendente'"
                @click.native.stop
                @click="refuseRequest(props.item.userId, props.item._id, props.item.animal)"
              >close</v-icon>
              <v-icon
                medium
                v-if="!props.item.animal.owner && props.item.state == 'Pendente'"
                @click.native.stop
                @click="acceptRequest(props.item.userId, props.item._id, props.item.animal)"
              >check</v-icon>
              <v-icon
                medium
                v-if="props.item.state == 'Aceite'"
                @click.native.stop
                @click="returnRequest(props.item.userId, props.item._id, props.item.animal._id, props.item.state)"
              >replay</v-icon>
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
                          <v-img
                            :src="props.item.animal.image"
                            class="specialCursor"
                            height="160px"
                            style="min-width:112px"
                            v-on="on"
                          ></v-img>
                        </template>
                        <v-card>
                          <v-img :src="props.item.animal.image" contain aspect-ratio="1"></v-img>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                    <v-flex>
                      <v-card-text>
                        <h4>
                          <p>Detalhes do animal:</p>
                        </h4>
                        <v-container
                          id="scroll-target"
                          style="max-height: 90px; max-width:500px; padding:0px;"
                          class="scroll-y breaker"
                        >{{props.item.details}}</v-container>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md7>
                <v-card height="160px">
                  <v-layout>
                    <v-flex xs3>
                      <!-- <v-img :src="props.item.animal.image"></v-img> -->
                      <v-img
                        height="160px"
                        style="min-width:112px"
                        src="https://via.placeholder.com/150"
                      ></v-img>
                    </v-flex>
                    <v-flex>
                      <v-card-text>
                        <h4>
                          <p>Detalhes do candidato:</p>
                        </h4>
                        <a :href="'mailto:' + props.item.userEmail">{{props.item.userEmail}}</a>
                        <p>{{props.item.userPhone}}</p>
                      </v-card-text>
                     
                     <span v-if="props.item.state == 'Pendente'">
                      <v-btn
                        color="info"
                        class="white--text"
                        v-if="!props.item.chat"
                        style="position:absolute;right:0;bottom:5px;font-size:10px"
                        @click="createChat(props.item._id, props.item.userId, props.item.animal, props.item)"
                      >
                        Criar conversa
                      </v-btn>
                    </span>
                      <v-btn
                        color="success"
                        class="white--text"
                        v-if="props.item.chat"
                        @click="redirectToChat"
                        style="position:absolute;right:0;bottom:5px;font-size:10px"
                      >
                        Ir para conversa
                      </v-btn>

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
          >Não foram encontrados resultados para "{{ search }}".</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>
    @import './AnimalRequests.scss';
</style>

<script>
import { authenticationService, userService, animalService, chatService } from "@/_services";

export default {
  name: "AnimalRequests",
  data() {
    return {
      usersList: [],
      newList: [],
      filters: [],
      timeout: 2000,
      expand: false,
      snackbar: false,
      index:null,
      message: "",
      dialog: false,
      deleteDialog: false,
      active_b: false,
      tempOwner: null,
      search: "",
      selected_prop:{userId: '', item_id: '', animal_id: '', item_state: ''},
      pagination: {
        sortBy: "state",
        ascending: true,
        rowsPerPage: 25
      },
      headers: [
        { text: "Delete", value: "delete", width: "1px" },
        { text: "User", value: "name" },
        { text: "Animal", value: "animal" },
        { text: "Date", value: "date" }
      ],
      selected: []
    };
  },

  methods: {
    selectProp(userId, item_id, animal_id, item_state) {
      console.log('selectProp');
        this.selected_prop['userId'] = userId;
        this.selected_prop['item_id'] = item_id;
        this.selected_prop['animal_id'] = animal_id;
        this.selected_prop['item_state'] = item_state;
    },
    redirectToChat(){
        this.$router.push({
              name: "Allconversations",
            });
    },
    stateChange(val) {
      if (val.length == 0) {
        this.newList = this.usersList;
      } else {
        this.newList = this.usersList.filter(x => val.includes(x.state));
      }
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    createChat(requestId, userId, animal, prop){
      chatService.createChat(requestId, userId, animal._id);
      prop.chat = true;
      this.deploySnackbar("Conversa criada");
      this.active_b = true;
    },
    acceptRequest(userId, requestId, animal) {
      animalService.acceptAnimalRequest(userId, requestId).then(x => {
        if (x.success) {
          this.updateInfo(requestId, animal);
          this.deploySnackbar("Aceite");
        }
      });
    },
    refuseRequest(userId, requestId, animal) {
      animalService.refuseAnimalRequest(userId, requestId).then(x => {
        if (x.success) {
          this.updateInfo(requestId, animal);
          this.deploySnackbar("Recusado");
        }
      });
    },
    deleteRequest() {
      let userId = this.selected_prop['userId'];
      let requestId = this.selected_prop['item_id'];
      let animalId = this.selected_prop['animal_id'];
      let requestState = this.selected_prop['item_state'];
      
      if (requestState == "Aceite") {
        animalService.returnAnimal(userId, animalId);
      }
      animalService.deleteAnimalRequest(userId, requestId).then(x => {
        if (x.success) {
          this.newList.forEach(element => {
            if(requestId == element._id){
                this.index = this.newList.indexOf(element);
            }
          });
          this.newList.splice(this.index, 1);
        }
      });
      this.deleteDialog = false;
    },
    returnRequest(userId, requestId, animalId, requestState) {
      animalService.returnAnimal(userId, animalId);
      animalService.returnAnimalRequest(userId, requestId).then(x => {
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
            this.newList = this.usersList;
          });
        }
      });
    },
    deploySnackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
    updateInfo(requestId, animal) {
      userService
        .getAll()
        .then(x => {
          x.forEach(element => {
            element.requests.forEach(request => {
              if (request._id == requestId) {
                request.name = element.name;
                request.userId = element.id;
                request.userEmail = element.email;
                request.userPhone = element.phonenumber;
                this.tempOwner = request.animal.owner;
                console.log(this.tempOwner);
                this.usersList = this.usersList.filter(
                  elem => elem._id != requestId
                );
                this.usersList.push(request);
              }
            });
          });
        })
        .then(() => {
          this.usersList.forEach(elem => {
            if (elem.animal._id == animal._id) {
              console.log("elem owner", elem.animal.owner);
              console.log("this owner", this.tempOwner);
              elem.animal.owner = this.tempOwner;
              console.log(elem.animal.owner);
            }
          });
          this.newList = this.usersList;
        });
    }
  },
  watch: {
    usersList: function(val) {
      this.filters = [...new Set(val.map(item => item.state))].sort();
    }
  },
  created() {
    userService.getAll().then(x => {
      x.forEach(element => {
        element.requests.forEach(request => {
          request.name = element.name;
          request.userId = element.id;
          request.userEmail = element.email;
          request.userPhone = element.phonenumber;
          if (element.chat){request.chat = element.chat;}
          this.usersList.push(request);
        });
      });
      this.newList = this.usersList;
    });
  }
};
</script>
