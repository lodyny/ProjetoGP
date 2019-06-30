<template>
  <div class="animal-grid-component" >
    <v-container grid-list-xl v-if="showAll">
      <v-layout row wrap center justify-center>
        <v-flex
          xs6
          sm4
          md3
          xl2
          class="lg5-custom"
        >
        <router-link :to="{ name: 'AddAnimal' }">
        <v-card tile>
            <v-img src="https://res.cloudinary.com/adotaqui/image/upload/v1560768741/addimage.bmp" height="250px"></v-img>
            <v-card-title primary-title class="ma-0 pa-0 justify-center">
              <div>
                <h3
                  class="card-tile"
                  style="margin-top:10px;font-size: 14px;line-height: 1.0;font-weight: bold;"
                >Add animal</h3>
              </div>
            </v-card-title>
          </v-card>
        </router-link>
          </v-flex>
        <v-flex
          xs6
          sm4
          md3
          xl2
          class="lg5-custom"
          v-for="(animal, idx) in filteredlist"
          v-bind:key="idx"
        >
          <AnimalCard v-bind:animalList="filteredlist"
                      v-bind:id="idx"
                     ></AnimalCard>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './AnimalGrid.scss';
</style>

<script>
import { authenticationService, animalService, userService } from "@/_services";
import { router, Role } from "@/_helpers";

import AnimalCard from "./AnimalCard";
import AnimalProfile from "./AnimalProfile";
import AnimalCrud from "./AnimalCrud";

export default {
  name: "Animal-grid-component",
  props: ["animalList"],
  components: {
    AnimalCard,
    AnimalProfile,
    AnimalCrud
  },
  
  data() {

    return {
      currentUser: null,
      specieFilter: null,
      breedFilter: null,
      nameFilter: null,
      showAnimalProfile: false,
      showAddAnimal: false,
      selectedAnimal: null,
      selectedAnimalIndex: null,
      firstTime : true,
      animals: [],
      animals:[],
      filteredlist: [],
      users: [],
      showAll: false
    };
  },

  methods: {
    cardEdit(animal, idx) {
      this.selectedAnimal = animal;
      this.selectedAnimalIndex = idx;
      console.log(idx);
      this.$emit("closeBar");
      this.showAddAnimal = true;
    },
    addAnimal() {
      this.$emit("closeBar");
      this.showAddAnimal = true;
    },
    onCloseCrud() {
      this.showAddAnimal = false;
      this.$emit("openBar");
    },
    filtrar() {
      var filtro = [...this.animals];
      if (this.breedFilter) {
        filtro = filtro.filter(
          animal => animal.breed.name_PT == this.breedFilter.name
        );
      } else if (this.specieFilter) {
        filtro = filtro.filter(
          animal => animal.specie.name_PT == this.specieFilter.name
        );
      }
      if (this.nameFilter) {
        filtro = filtro.filter(animal => animal.name.toUpperCase().includes(this.nameFilter.toUpperCase()));
      }
      this.filteredlist = filtro;
    },
    onSpecieChange(value) {
      console.log(value);
      this.specieFilter = value;
      this.breedFilter = null;
      this.filtrar();
    },
    onBreedChange(value) {
      this.breedFilter = value;
      this.filtrar();
    },
    onNameChange(value) {
      this.nameFilter = !value || value == "" ? null : value;
      this.filtrar();
    }, 
    onRemoveFilter(){
      console.log("Filter");
      this.breedFilter = null;
      this.nameFilter = null;
      this.specieFilter = null;
      this.filtrar();
    }
  },
  mounted() {
    
  
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;      
    },
    checkBarVisibility(){
      console.log('here>>',this.showAnimalProfile || this.showAddAnimal);
      return this.showAnimalProfile || this.showAddAnimal;
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));

    if(this.animalList){
      this.animals = this.animalList;
    }else{
    animalService.getAll().then(animals => animals.animals.forEach(element => {
      this.animals.push(element);
    })).then(this.showAll = true);
    }
    this.filteredlist = this.animals;
  }
};
</script>
