<template>
  <div class="animal-profile-component">
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="purple" dark>
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-card-text>aaa</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6>
          <v-layout column>
            <v-flex d-flex>
              <v-card color="purple" dark>
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm4>
                    <v-layout column>
                      <v-flex d-flex>
                        <v-card color="purple" dark>
                          <v-card-title primary class="title">Loremaaaaaaaaaaaa</v-card-title>
                          <v-card-text>aaa</v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex d-flex xs12 sm4>
                    <v-layout column>
                      <v-flex d-flex>
                        <v-card color="purple" dark>
                          <v-card-title primary class="title">Lorem</v-card-title>
                          <v-card-text>bbb</v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex d-flex xs12 sm4>
                    <v-layout column>
                      <v-flex d-flex>
                        <v-card color="purple" dark>
                          <v-card-title primary class="title">Lorem</v-card-title>
                          <v-card-text>ccc</v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-card-text>aaa</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-card color="purple" dark>
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-card-text>eee</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
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
  name: "Animal-profile-component",
  props: ["animalObj"],
  data() {
    return {
      currentGender: null,
      bottomNav: "recent"
    };
  },

  methods: {},
mounted () {
    console.log(this.$vuetify.breakpoint)
  },
  watch: {
    // whenever question changes, this function will run
    animalObj: function() {
      console.log(this.currentGender);
    }
  },
  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.threholds) {
        case 'xs': return '601px'
        case 'sm': return '960px'
        case 'md': return '1280px'
        case 'lg': return '1920px'
      }
    }
  }
};
</script>
