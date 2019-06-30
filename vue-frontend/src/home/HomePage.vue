<template>
  <div>
    <Toolbar @specieChange="onSpecieChange" @breedChange="onBreedChange" @nameChange="onNameChange" @removeFilter="onRemoveFilter" v-if="toolBarOpen"/>
    <AnimalGrid ref="animalGrid" v-bind:animalList="animalList" @closeBar="toolBarOpen = false" @openBar="toolBarOpen = true"/> 
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
      toolBarOpen: true
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
    console.log("<<", this.animalList);
  }
};
</script>