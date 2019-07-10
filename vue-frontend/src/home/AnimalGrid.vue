<template>
  <div class="animal-grid-component" >
    <v-container grid-list-xl >
      <v-layout row wrap center justify-center>
        <v-flex
          xs6
          sm4
          md3
          xl2
          class="lg5-custom"
          v-if="isAdmin"
        >
        <router-link :to="{ name: 'AnimalCrud' }" tag="li">
        <v-card tile>
            <v-img src="https://res.cloudinary.com/adotaqui/image/upload/v1560768741/addimage.bmp" height="250px"></v-img>
            <v-card-title primary-title class="ma-0 pa-0 justify-center">
              <div>
                <h3
                  class="card-tile removeall"
                  style="margin-top:10px;font-size: 14px;line-height: 1.0;font-weight: bold"
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
      filteredlist: [],
      users: []
    };
  },

  methods: {
    cardEdit(animal, idx) {
      this.selectedAnimal = animal;
      this.selectedAnimalIndex = idx;
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
          animal => animal.breed._id == this.breedFilter._id
        );
      } else if (this.specieFilter) {
        filtro = filtro.filter(
          animal => animal.specie._id == this.specieFilter._id
        );
      }
      if (this.nameFilter) {
        filtro = filtro.filter(animal => animal.name.toUpperCase().includes(this.nameFilter.toUpperCase()));
      }
      this.filteredlist = filtro;
    },
    onSpecieChange(value) {
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
    }));
    }
    this.filteredlist = this.animals;    
  }
};
</script>
