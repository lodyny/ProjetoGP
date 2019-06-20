<template>
  <div>
    <Toolbar @specieChange="onSpecieChange" @breedChange="onBreedChange" @nameChange="onNameChange" v-if="toolBarOpen"/>
    <AnimalGrid ref="animalGrid" @closeBar="toolBarOpen = false" @openBar="toolBarOpen = true"/> -->
    <!-- <AnimalCrud/> -->
    <!-- <UserProfile/> -->
  </div>
</template>


<script>
import Toolbar from "./FilterToolbar";
import AnimalGrid from "./AnimalGrid";
import AnimalCrud from "./AnimalCrud";
import UserProfile from "./UserProfile";

export default {
  components: {
    AnimalGrid,
    Toolbar,
    AnimalCrud,
    UserProfile
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
    }
  },
  mounted() {
    console.log('here');
  },
};
</script>