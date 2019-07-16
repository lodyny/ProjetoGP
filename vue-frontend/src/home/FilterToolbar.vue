<template>
  <div class="toolbar-component">
    <v-container grid-list-xl>
      <v-layout row wrap center justify-center>
        <v-flex xs2>
          <v-select
            v-model="e1"
            :items="species"
            item-text="name_PT"
            menu-props="auto"
            label="Espécie"
            hide-details
            :prepend-icon="currentIcon"
            single-line
            return-object
            @change="specieChange"
          ></v-select>
        </v-flex>

        <v-flex xs3>
          <v-select
            v-model="e2"
            :disabled="isDisabled"
            :items="localBreed"
            item-text="name_PT"
            menu-props="auto"
            label="Raça"
            hide-details
            prepend-icon="map"
            single-line
            return-object
            @change="breedChange"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs3>
          <v-text-field v-model="filterName" placeholder="Nome do Animal" @change="nameChange"></v-text-field>
        </v-flex>
        <v-flex xs2 align-center>
          <v-btn color="warning" style="margin-top:15px" @click="removeFilter">Remover Filtros</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './FilterToolbar.scss';
</style>

<script>
import {animalService } from "@/_services";

export default {
  name: "Toolbar-component",
  data() {
    return {
      e1: "",
      e2: "",
      isDisabled: true,
      filterName: "",
      localBreed: null,
      currentIcon: "fas fa-paw",
      species: null
    };
  },

  methods: {
    removeFilter(){
      this.isDisabled = true;
      this.e1 = "";
      this.e2 = "";
      this.filterName = "";
      this.$emit("removeFilter");
    },
    specieChange(value) {
      this.isDisabled = false;
      this.e2 = null;
      this.currentIcon = value.icon;
      this.localBreed = value.breeds;
      this.$emit("specieChange", value);
    },
    breedChange(value) {
      this.$emit("breedChange", value);
    },
    nameChange(value) {
      this.$emit("nameChange", value);
    }
  }, created(){
      animalService.getSpecies().then(species => this.species = species.species)
  }
};
</script>
