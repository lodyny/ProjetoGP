<template>
  <div class="AnimalAdoption">
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex d-flex>
                
              <v-card style="margin-top:-2px;padding-bottom:60px;height:570px;">
                  <v-card-title class="justify-center" style="margin-top:15px; margin-bottom:-20px">
                  <h1 >Adopt {{current_animal.name}}</h1>
                  </v-card-title>
                    <v-img :src="current_animal.image" height="490px" contain></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6>
          <v-layout column>
            <v-card style="padding-bottom:60px;height:570px;">
              <v-card-title class="justify-center align-center">
              </v-card-title>
              <v-container id="scroll-target" style="max-height: 400px;" class="scroll-y"></v-container>
            <v-textarea
                  style="padding-left:20px;padding-right:20px;margin-top:-27px; ma-0 pa-0"
                  label="Request details"
                  counter
                  class="mb-0 pa-0;"
                  maxlength="700"
                  no-resize
                  auto-grow
                  v-model="adoptionDetails"
                ></v-textarea>
                <v-btn color="teal"
                @click="submit()"
                style="float:right; margin-right:20px; margin-top:30px;"
                 >
                    Submit request
                  </v-btn>
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
import { authenticationService, animalService, userService } from "@/_services";
import { router, Role } from "@/_helpers";

export default {
  name: "AnimalAdoption",
  props:['current_animal'],
  data() {
    return {
        currentUser: null,
        menu:false,
        adoptionDetails:null
    };
  },

  methods: {
    submit() {
      animalService.createRequest(this.currentUser.email, this.adoptionDetails , this.current_animal._id);  
    }
  },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
        }
    },
  mounted() {},
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }
};
</script>
