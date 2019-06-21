<template>
  <div class="animal-profile-component">
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card style="padding-bottom:60px;">
                <v-card-title class="justify-center">
                  <h1
                    style="margin-top:30px;"
                  >Olá! Eu sou {{inneranimalList[animal_id].gender == 1 ? 'o' : 'a'}} {{inneranimalList[animal_id].name}}</h1>
                </v-card-title>
                <v-container id="scroll-target" style="max-height: 400px;" class="scroll-y">
                  <v-card-text>
                    O Beau e os seus companheiros tiveram uma vida espetacular numa quinta, mas tudo acabou quando o seu dono morreu. Os cães permaneceram na quinta e foram sendo alimentados pelos vizinhos até que foram enviados para o abrigo. São cães meigos e obedientes e merecem melhor que isto. São membros de família maravilhosos e estão habituados a ter uma casa. O Beau é o mais extrovertido. Enquanto as miúdas podem ser um pouco nervosas em novas circunstâncias, o Beau sentiu-se em casa ao chegar ao abrigo. Qualquer coisa nova interessante, ele tem que ver, tem que sentir o cheiro. Adaptar-se-ia muito bem a uma nova casa.
                    Está vacinado, desparasitado e esterilizado.
                    O Beau e os seus companheiros tiveram uma vida espetacular numa quinta, mas tudo acabou quando o seu dono morreu. Os cães permaneceram na quinta e foram sendo alimentados pelos vizinhos até que foram enviados para o abrigo. São cães meigos e obedientes e merecem melhor que isto. São membros de família maravilhosos e estão habituados a ter uma casa. O Beau é o mais extrovertido. Enquanto as miúdas podem ser um pouco nervosas em novas circunstâncias, o Beau sentiu-se em casa ao chegar ao abrigo. Qualquer coisa nova interessante, ele tem que ver, tem que sentir o cheiro. Adaptar-se-ia muito bem a uma nova casa.
                    Está vacinado, desparasitado e esterilizado.
                    O Beau e os seus companheiros tiveram uma vida espetacular numa quinta, mas tudo acabou quando o seu dono morreu. Os cães permaneceram na quinta e foram sendo alimentados pelos vizinhos até que foram enviados para o abrigo. São cães meigos e obedientes e merecem melhor que isto. São membros de família maravilhosos e estão habituados a ter uma casa. O Beau é o mais extrovertido. Enquanto as miúdas podem ser um pouco nervosas em novas circunstâncias, o Beau sentiu-se em casa ao chegar ao abrigo. Qualquer coisa nova interessante, ele tem que ver, tem que sentir o cheiro. Adaptar-se-ia muito bem a uma nova casa.
                    Está vacinado, desparasitado e esterilizado.
                  </v-card-text>
                </v-container>
                <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
                  <v-btn color="teal" flat @click="onPreviousProfile()">
                    <span>Previous</span>
                    <v-icon>fas fa-arrow-left</v-icon>
                  </v-btn>

                  <router-link :to="{ name: 'Home', params: { inneranimalList } }">
                  <v-btn color="teal" flat>
                    <span>Back</span>
                    <v-icon>fas fa-undo</v-icon>
                  </v-btn>
                  </router-link>

                  <v-btn color="teal" flat @click="onNextProfile()">
                    <span>Next</span>
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
                <template v-slot:actions>
                  <v-icon standard color="orange darken-2">fas fa-asterisk</v-icon>
                </template>
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
                  <v-btn color="success" round style="min-width:145px;max-width:145px;">
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

            <v-flex d-flex>
              <v-parallax :src="inneranimalList[animal_id].image" height="375px"></v-parallax>
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

export default {
  name: "Animal-profile-component",
  props: ["animalList","id","url_id"],
  data() {
    return {
      animal_id:0,
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
  },
  created() {
    if(!this.animalList){
      this.inneranimalList = [animalService.getById(this.$route.params.url_id)];
      console.log(this.inneranimalList);
      this.animal_id = 0;
    } else {
      this.animal_id = this.id;
      this.inneranimalList = this.animalList;
    }
  }
};
</script>
