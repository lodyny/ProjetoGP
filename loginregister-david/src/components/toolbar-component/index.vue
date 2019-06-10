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
            @change="viewselected"
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
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs3>
          <v-text-field placeholder="Animal name"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './index.scss';
</style>

<script>
export default {
  name: "Toolbar-component",
  data() {
    return {
      e1: "Florida",
      e2: "Florida",
      localBreed: null,
      currentIcon: "fas fa-paw",
      species: [
        {
          id: 1,
          icon: "fas fa-dog",
          name: "Dog",
          breeds: [
            { id: 1, name: "Pastor alemão" },
            { breedId: 1, name: "Labrador" }
          ]
        },
        {
          id: 2,
          icon: "fas fa-cat",
          name: "Cat",
          breeds: [{ id: 1, name: "Siamês" }, { breedId: 1, name: "Persa" }]
        },
        {
          id: 3,
          icon: "fas fa-crow",
          name: "Bird",
          breeds: [
            { id: 1, name: "Papagaio" },
            { breedId: 1, name: "Avestruz" }
          ]
        }
      ]
    };
  },

  methods: {
    viewselected(value) {
      console.log("here", value.icon);
      this.currentIcon = value.icon;
      this.species.forEach(element => {
        if (element.id == value.id) {
          this.localBreed = element.breeds;
        }
      });
    }
  },
  mounted() {}
};
</script>
