<template>
  <div>
    <Toolbar @specieChange="onSpecieChange" @breedChange="onBreedChange" @nameChange="onNameChange" v-if="toolBarOpen"/>
    <AnimalGrid ref="animalGrid" @closeBar="toolBarOpen = false" @openBar="toolBarOpen = true"/>
  </div>
</template>


<script>
import Toolbar from "./FilterToolbar";
import AnimalGrid from "./AnimalGrid";

export default {
  components: {
    AnimalGrid,
    Toolbar
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
  }
};
</script>