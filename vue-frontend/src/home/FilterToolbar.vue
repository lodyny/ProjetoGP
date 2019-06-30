<template>
  <div class="toolbar-component">
    <v-container grid-list-xl>
      <v-layout row wrap center justify-center>
        <v-flex xs2>
          <v-select
            v-model="e1"
            :items="species"
            item-text="name"
            menu-props="auto"
            label="Specie"
            hide-details
            :prepend-icon="currentIcon"
            single-line
            return-object
            @change="specieChange"
          ></v-select>
        </v-flex>

        <v-flex xs2>
          <v-select
            v-model="e2"
            :items="localBreed"
            item-text="name"
            menu-props="auto"
            label="Breed"
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
export default {
  name: "Toolbar-component",
  data() {
    return {
      e1: "",
      e2: "",
      filterName: "",
      localBreed: null,
      currentIcon: "fas fa-paw",
      species: [
        {
          id: 1,
          icon: "fas fa-dog",
          name: "Cão",
          breeds: [
            { id: 1, name: "Pastor Alemão" },
            { breedId: 1, name: "Labrador" }
          ]
        },
        {
          id: 2,
          icon: "fas fa-cat",
          name: "Gato",
          breeds: [{ id: 1, name: "Siamês" }, { breedId: 1, name: "Persa" }]
        },
        {
          id: 3,
          icon: "fas fa-crow",
          name: "Pássaro",
          breeds: [
            { id: 1, name: "Papagaio" },
            { breedId: 1, name: "Avestruz" }
          ]
        }
      ]
    };
  },

  methods: {
    removeFilter(){
      this.e1 = "";
      this.e2 = "";
      this.filterName = "";
      this.$emit("removeFilter");
    },
    specieChange(value) {
      this.e2 = null;
      this.currentIcon = value.icon;
      this.species.forEach(element => {
        if (element.id == value.id) {
          this.localBreed = element.breeds;
        }
      });
      this.$emit("specieChange", value);
    },
    breedChange(value) {
      this.$emit("breedChange", value);
    },
    nameChange(value) {
      this.$emit("nameChange", value);
    }
  }
};
</script>
