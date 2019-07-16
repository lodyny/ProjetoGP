<template>
  <div class="animal-profile-component">
    <v-container grid-list-sm  v-if="!isFetching" > 
      <v-layout row wrap >
        <v-flex d-flex xs12 sm6 >
          <v-layout row wrap >
            <v-flex d-flex>
              <v-card style="margin-top:-2px;padding-bottom:60px;height:570px;">
                <v-card-title class="justify-center">
                  <h1
                    style="margin-top:30px;"
                  >Olá! Eu sou {{inneranimalList[animal_id].gender == 1 ? 'o' : 'a'}} {{inneranimalList[animal_id].name}}</h1>
                </v-card-title>
                <v-container id="scroll-target" style="max-height: 400px;" class="scroll-y">
                  <v-card-text v-html="inneranimalList[animal_id].details">
                  </v-card-text>
                </v-container>
                <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
                  <v-btn v-if="!singleMode" color="teal" flat @click="onPreviousProfile()">
                    <span>Anterior</span>
                    <v-icon>fas fa-arrow-left</v-icon>
                  </v-btn>

                  <v-btn color="teal" @click="onBackPressed" flat>
                    <span>Voltar</span>
                    <v-icon>fas fa-undo</v-icon>
                  </v-btn>

                  <v-btn v-if="!singleMode" color="teal" flat @click="onNextProfile()">
                    <span>Próximo</span>
                    <v-icon>fas fa-arrow-right</v-icon>
                  </v-btn>
                </v-bottom-nav>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6>
          <v-layout column>
            <v-expansion-panel>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <h3 class="headline mb-0 pa-0;">
                  <span
                    :style="inneranimalList[animal_id].gender == 1 ? 'color:dodgerblue' : 'color:#E75480'"
                  >
                    <font-awesome-icon :icon="inneranimalList[animal_id].gender == 1 ? 'mars' : 'venus'"/>
                  </span>
                  {{inneranimalList[animal_id].breed.name_PT}}
                  </h3>
                  <v-spacer></v-spacer>

                  <v-btn v-if="currentUser" @click="onAdoptionPressed" color="success" round style="min-width:145px;max-width:145px;">
                    <v-icon left>fas fa-paw</v-icon>
                    <span>Adota-me</span>
                  </v-btn>
                  
                </template>
                <v-card>
                  <v-layout row wrap>
                    <v-flex d-flex xs12 sm4>
                      <v-layout column>
                        <v-flex d-flex>
                          <v-btn disabled round large color="blue-grey" class="white--text">
                            <v-icon left>fas fa-weight-hanging</v-icon>
                            <span>{{inneranimalList[animal_id].weight}} cm</span>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex d-flex xs12 sm4>
                      <v-layout column>
                        <v-flex d-flex>
                          <v-btn disabled round large color="blue-grey" class="white--text">
                            <v-icon left>fas fa-text-height</v-icon>
                            <span>{{inneranimalList[animal_id].height}} kg</span>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex d-flex xs12 sm4>
                      <v-layout column>
                        <v-flex d-flex>
                          <v-btn disabled round large color="blue-grey" class="white--text">
                            <v-icon left>fas fa-birthday-cake</v-icon>
                            <span>{{inneranimalList[animal_id].birthday}}</span>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-flex d-flex style="min-height:450px;">
              <v-img :src="inneranimalList[animal_id].image" height="420px" contain></v-img>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './AnimalProfile.scss';
</style>

<script>
import { animalService } from "@/_services";
import { authenticationService } from "@/_services";
import { router, Role } from "@/_helpers";

export default {
  name: "Animal-profile-component",
  props: ["animalList","id","url_id"],
  data() {
    return {
      currentUser: null,
      inneranimalList:[],
      isFetching:true,
      animal_id:0,
      singleMode:true,
      current_id:null,
      currentGender: null,
      bottomNav: "recent"
    };
  },

  methods: {
    onNextProfile() {
      if (this.animal_id < this.inneranimalList.length - 1) {
        this.animal_id++;
      } else {
        this.animal_id = 0;
      }
      this.$router.push({name: 'AnimalProfile', params: {animalList:this.inneranimalList, id:this.animal_id, url_id:this.animalList[this.animal_id]._id}});
    },
    onPreviousProfile() {
      if (this.animal_id > 0) {
        this.animal_id--;
      } else {
        this.animal_id = this.inneranimalList.length - 1;
      }
      this.$router.push({name: 'AnimalProfile', params: {animalList:this.inneranimalList, id:this.animal_id, url_id:this.animalList[this.animal_id]._id}});
    },
    onBackPressed(){
      this.$router.push({name: 'Home', params: { current_animal:this.inneranimalList[this.animal_id] } });
    },
    onAdoptionPressed(){
      this.$router.push({name: 'AnimalAdoption', params: { current_animal:this.inneranimalList[this.animal_id] } });
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    if(!this.animalList){
      animalService.getById(this.$route.params.url_id).then(animal => {
      this.inneranimalList.push(animal.animal);
      this.isFetching = false});
      this.animal_id = 0;
    } else {
      this.animal_id = this.id;
      this.inneranimalList = this.animalList;
      this.isFetching = false;
      this.singleMode = false;
    }
  }
};
</script>
