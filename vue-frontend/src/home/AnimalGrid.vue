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
        <v-flex xs6 sm4 md3 xl2 class="lg5-custom" v-for="(animal, idx) in filteredlist" v-bind:key="idx">
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
import AnimalCard from "./AnimalCard";
import Profile from "./AnimalProfile";

export default {
  name: "Animal-grid-component",

  components: {
    AnimalCard,
    Profile
  },
  data() {
    var list = [
      {
        name: "Chubby",
        gender: 1,
        breed: {
          name: "German Shephard",
          name_PT: "Pastor Alemão",
          specie: { name: "Dog", name_PT: "Cão" }
        },
        height: 100,
        weight: 100,
        birthday: "10/02/2005",
        details: "this is Chubby",
        image: "https://avatars3.githubusercontent.com/u/16657688?s=460&v=4"
      },
      {
        name: "Irmão do Chubby",
        gender: 1,
        breed: {
          name: "German Shephard",
          name_PT: "Pastor Alemão",
          specie: { name: "Dog", name_PT: "Cão" }
        },
        height: 100,
        weight: 100,
        birthday: "10/02/2005",
        details: "this is Chubby",
        image:
          "https://www.adopta-me.org/media/image/thumb/85119638-Beau__3_.jpg"
      },
      {
        name: "Irmã do Chubby",
        gender: "0",
        breed: {
          name: "German Shephard",
          name_PT: "Pastor Alemão",
          specie: { name: "Dog", name_PT: "Cão" }
        },
        height: 100,
        weight: 100,
        birthday: "10/02/2005",
        details: "this is Chubby",
        image: "https://avatars3.githubusercontent.com/u/16657688?s=460&v=4"
      },
      {
        name: "Prima do Chubby",
        gender: "0",
        breed: {
          name: "German Shephard",
          name_PT: "Pastor Alemão",
          specie: { name: "Dog", name_PT: "Cão" }
        },
        height: 100,
        weight: 100,
        birthday: "10/02/2005",
        details: "this is Chubby",
        image: "https://avatars3.githubusercontent.com/u/16657688?s=460&v=4"
      },
      {
        name: "Primo do Chubby",
        gender: "1",
        breed: {
          name: "German Shephard",
          name_PT: "Pastor Alemão",
          specie: { name: "Dog", name_PT: "Cão" }
        },
        height: 100,
        weight: 100,
        birthday: "10/02/2005",
        details: "this is Chubby",
        image: "https://avatars3.githubusercontent.com/u/16657688?s=460&v=4"
      },
      {
        name: "Avó do Chubby",
        gender: "0",
        breed: {
          name: "German Shephard",
          name_PT: "Labrador",
          specie: { name: "Dog", name_PT: "Cão" }
        },
        height: 100,
        weight: 100,
        birthday: "10/02/2005",
        details: "this is Chubby",
        image: "https://avatars3.githubusercontent.com/u/16657688?s=460&v=4"
      },
      {
        name: "Avô do Chubby",
        gender: "1",
        breed: {
          name: "German Shephard",
          name_PT: "Pastor Alemão",
          specie: { name: "Dog", name_PT: "Cão" }
        },
        height: 100,
        weight: 100,
        birthday: "10/02/2005",
        details: "this is Chubby",
        image: "https://avatars3.githubusercontent.com/u/16657688?s=460&v=4"
      }
    ];
    return {
      specieFilter: null,
      breedFilter: null,
      nameFilter: null,
      showAnimalProfile: false,
      selectedAnimal: null,
      selectedAnimalIndex: null,
      animallist: list,
      filteredlist: list
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
      console.log("emit open");
      this.showAnimalProfile = false;
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
      var filtro = [ ...this.animallist ];
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
        filtro = filtro.filter(animal =>
          animal.name.includes(this.nameFilter)
        );
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
  mounted() {}
};
</script>
