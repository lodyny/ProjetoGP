<template>
  <div class="AnimalAdoption">
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card style="margin-top:-2px;padding-bottom:60px;height:570px;">
                    <v-img :src="current_animal.image" height="570px" contain></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6>
          <v-layout column>
            <v-card style="padding-bottom:60px;height:570px;">
              <v-card-title class="justify-center">
                <v-date-picker
                v-model="date"
                full-width
                landscape
                :min="deltaDate(new Date(), 0, 0, 0).toISOString().substr(0, 10)"
                class="mt-3"
                ></v-date-picker>
              </v-card-title>
              <v-container id="scroll-target" style="max-height: 400px;" class="scroll-y"></v-container>
              <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent"></v-bottom-nav>
            </v-card>
            <v-flex d-flex style="min-height:450px;"></v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './AnimalAdoption.scss';
</style>

<script>
export default {
  name: "AnimalAdoption",
  props:['current_animal'],
  data() {
    return {
        date: new Date().toISOString().substr(0, 10),
        menu:false
    };
  },

  methods: {
      save(date) {
      this.$refs.menu.save(date);
    },
    deltaDate(input, days, months, years) {
      var date = new Date(input);
      date.setDate(date.getDate() + days);
      date.setMonth(date.getMonth() + months);
      date.setFullYear(date.getFullYear() + years);
      return date;
    }
  },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
        }
    },
  mounted() {}
};
</script>
