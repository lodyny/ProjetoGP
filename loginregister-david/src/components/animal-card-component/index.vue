<template>
  <div class="animal-card-component">
    <v-card tile @click="viewselected(animal)">
      <v-img :src="animal.image" height="250px"></v-img>
      <v-card-title primary-title class="ma-0 pa-0 justify-center">
        <div>
          <h4 class="card-tile" style="margin-top:10px">{{animal.name}}</h4>
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
    @import './index.scss';
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
