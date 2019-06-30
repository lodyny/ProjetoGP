<template>
    <div class="AnimalRequests">
        <v-card>
    <v-card-title>
      <h1>Animal Requests</h1>
      <v-spacer></v-spacer>
      <div
      >
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        style="padding-top: 0px; margin-right:10px"
      ></v-text-field>
      </div>
      <v-btn color="warning" dark @click="expand = !expand">
        {{ expand ? 'Keep' : 'Close' }} other rows
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="usersList"
      :search="search"
      :expand="expand"
      item-key="_id"
    >
      <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded" >
        <td class="text-xs-left grey lighten-4">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.animal.name }}
            <span
          :style="props.item.animal.gender == 1 ? 'color:dodgerblue' : 'color:#E75480'"
        >
          <i :class="props.item.animal.gender == 1 ? 'fas fa-mars' : 'fas fa-venus'"></i>
        </span>
        </td>
        <td class="text-xs-left grey lighten-4">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.state }}</td>
        <td class="align-center  layout px-0">
          <v-icon
            medium
            class="mr-2"
            @click="editItem(props.item)"
          >
            close
          </v-icon>
          <v-icon
            medium
            @click="deleteItem(props.item)"
          >
            check
          </v-icon>
        </td>
        </tr>
      </template>
      <template v-slot:expand="props">

        <v-container grid-list-sm  v-if="!isFetching" > 
      <v-layout row wrap >
        <v-flex d-flex xs12 sm2 >
          <v-layout row wrap >
            <v-flex d-flex>
			       <v-card flat>
        <v-img :src="props.item.animal.image"></v-img>
      <v-card-title primary-title class="ma-0 pa-0 justify-center">
        <div>
          <h3 class="card-tile" style="margin-top:10px;font-size: 14px;line-height: 1.0;font-weight: bold;"></h3>
        </div>
      </v-card-title>
</v-card>
	</v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6>
          <v-layout column>
		<v-card-text><h4><p>Request details:</p></h4> {{props.item.details}}</v-card-text>
          </v-layout>
           </v-flex>
          </v-layout>

		  </v-container>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
    </div>
</template>

<style lang="sass" scoped>
    @import './AnimalRequests.scss';
</style>

<script>

import { authenticationService, userService } from "@/_services";

export default {
    name: 'AnimalRequests',
    data() {
        return {
            usersList: [],
            expand: false,
            search: '',
            headers: [
            { text: 'User', value: 'name' },
            { text: 'Animal', value: 'animal' },
            { text: 'Date', value: 'date' },
            { text: 'State', value: 'state' },
            ],
        };
    },
    
    methods: {
        
    },
    mounted() {
        
    },
    created(){
        userService.getAll().then(
          x => {


              x.forEach(element => {
                  element.requests.forEach(request => {
                  request.name = element.name;
                  this.usersList.push(request);
                  })
              });

          }
          );
    }
};
</script>
