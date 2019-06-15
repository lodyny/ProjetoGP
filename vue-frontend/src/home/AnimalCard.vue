<template>
  <div class="animal-card-component">
    <v-card tile @click="viewselected(animal)">
      <v-img :src="animal.image" height="250px"></v-img>
      <v-card-title primary-title class="ma-0 pa-0 justify-center">
        <div>
          <h3 class="card-tile" style="margin-top:10px;font-size: 14px;line-height: 1.0;font-weight: bold;">{{animal.name}}</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span
          style="position:absolute;right:0;bottom:0;margin-right:5px;font-size:18px;"
          :style="animal.gender == 1 ? 'color:dodgerblue' : 'color:#E75480'"
        >
          <i :class="animal.gender == 1 ? 'fas fa-mars' : 'fas fa-venus'"></i>
        </span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>
    @import './AnimalCard.scss';
</style>

<script>

export default {
  props: ["animal"],
  name: "Animal-card-component",
  data() {
    return {};
  },

  methods: {
    viewselected(value) {
        this.$emit('selectAnimal', value);
    }
  },
  mounted() {}
};
</script>
