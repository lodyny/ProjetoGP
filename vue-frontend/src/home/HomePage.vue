<template>
  <div>
    <Toolbar @specieChange="onSpecieChange" @breedChange="onBreedChange" @nameChange="onNameChange" @removeFilter="onRemoveFilter" v-if="toolBarOpen"/>
    <AnimalGrid ref="animalGrid" v-bind:animalList="animalList" @closeBar="toolBarOpen = false" @openBar="toolBarOpen = true"/> 
    <v-snackbar
      v-model="snackbar"
      color="success"
      :timeout="timeout"
      style="margin-top:50px; z-index:1"
      top
      right
    >
      {{message}}
      <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <!-- <RoleUpdate/>   -->
    <!-- <UserProfile/> -->
  </div>
</template>


<script>
import Toolbar from "./FilterToolbar";
import AnimalGrid from "./AnimalGrid";
import AnimalCrud from "./AnimalCrud";
import UserProfile from "./UserProfile";
import AnimalAdoption from "./AnimalAdoption";
import RoleUpdate from "./RoleUpdate";

export default {
  props: ["animalList"],
  components: {
    AnimalGrid,
    Toolbar,
    AnimalCrud,
    UserProfile,
    AnimalAdoption,
    RoleUpdate
  },
  data() {
    return {
      toolBarOpen: true,
      timeout: 2000,
      snackbar: false,
      message: ""
    };
  },
  methods: {
    onSpecieChange(value) {
      this.$refs.animalGrid.onSpecieChange(value);
    },
    onBreedChange(value) {
      this.$refs.animalGrid.onBreedChange(value);
    },
    onNameChange(value) {
      this.$refs.animalGrid.onNameChange(value);
    },
    onRemoveFilter(){
      this.$refs.animalGrid.onRemoveFilter();
    }
  },
  created() {
    if(this.$route.params.outMessage){
      this.message = this.$route.params.outMessage;
      this.snackbar = true;
    }
  }
};
</script>