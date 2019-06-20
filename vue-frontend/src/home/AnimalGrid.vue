<template>
  <div class="animal-grid-component">
    <Profile
      v-bind:animalObj="selectedAnimal"
      v-if="showAnimalProfile"
      @close="onCloseProfile"
      @next="onNextProfile"
      @previous="onPreviousProfile"
    />
    <v-container grid-list-xl v-if="!showAnimalProfile">
      <v-layout row wrap center justify-center>
        <v-flex
          xs6
          sm4
          md3
          xl2
          class="lg5-custom"
        >
        <v-card tile >
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
          <AnimalCard v-bind:animal="animal" @selectAnimal="cardSelected(animal, idx)"></AnimalCard>
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
import Profile from "./AnimalProfile";

export default {
  name: "Animal-grid-component",

  components: {
    AnimalCard,
    Profile
  },
  
  data() {

    return {
      currentUser: null,
      specieFilter: null,
      breedFilter: null,
      nameFilter: null,
      showAnimalProfile: false,
      showAnimalCrud: false,
      selectedAnimal: null,
      selectedAnimalIndex: null,
      firstTime : true,
      animals: [],
      animals:[],
      filteredlist: [],
      users: []
    };
  },

  methods: {
    cardSelected(animal, idx) {
      console.log("message from child", animal);
      this.selectedAnimal = animal;
      this.selectedAnimalIndex = idx;
      console.log(idx);
      this.$emit("closeBar");
      this.showAnimalProfile = true;
    },
    onCloseProfile() {
      this.showAnimalProfile = false;
      this.$emit("openBar");
    },
    onCloseCrud() {
      this.showAnimalCrud = false;
      this.$emit("openBar");
    },
    onNextProfile() {
      if (this.selectedAnimalIndex < this.filteredlist.length - 1) {
        this.selectedAnimalIndex++;
      } else {
        this.selectedAnimalIndex = 0;
      }
      this.selectedAnimal = this.filteredlist[this.selectedAnimalIndex];
    },
    onPreviousProfile() {
      if (this.selectedAnimalIndex > 0) {
        this.selectedAnimalIndex--;
      } else {
        this.selectedAnimalIndex = this.filteredlist.length - 1;
      }
      this.selectedAnimal = this.filteredlist[this.selectedAnimalIndex];
    },
    filtrar() {
      var filtro = [...this.animals];
      if (this.breedFilter) {
        filtro = filtro.filter(
          animal => animal.breed.name_PT == this.breedFilter.name
        );
      } else if (this.specieFilter) {
        filtro = filtro.filter(
          animal => animal.breed.specie.name_PT == this.specieFilter.name
        );
      }
      if (this.nameFilter) {
        filtro = filtro.filter(animal => animal.name.includes(this.nameFilter));
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
    }
  },
  mounted() {
    
  
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;      
    },
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    animalService.getAll().then(animals => animals.animals.forEach(element => {
      element.breed = animalService.getBreedByAnimalId(element.breed).then(breed => element.breed = breed.breed);
      this.animals.push(element);
    }));
    this.filteredlist = this.animals;
  }
};
</script>
