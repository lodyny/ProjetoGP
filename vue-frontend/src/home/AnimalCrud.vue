<template>
  <div class="animal-crud-component">
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 style="padding-right:6px;">
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card height="600">
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-text-field
                      style="padding-left:20px;padding-right:20px;margin-top:30px;"
                      label="Animal name"
                      v-model="animalName"
                      clearable
                      maxlength="20"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-select
                      style="padding-left:20px;padding-right:20px;margin-top:30px;"
                      v-model="animalSex"
                      :items="sex"
                      label="Sex"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-textarea
                  style="padding-left:20px;padding-right:20px;margin-top:0px;"
                  label="Details"
                  counter
                  class="mb-0 pa-0;"
                  maxlength="700"
                  no-resize
                  auto-grow
                  v-model="animalDetails"
                ></v-textarea>

                <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">

                  <v-btn color="teal" flat @click="backClick">
                    <span style="margin-top:4px">Cancel without saving</span>
                    <v-icon>fas fa-undo</v-icon>
                  </v-btn>

                  <v-btn color="teal" @click="saveClick" flat>
                    <span style="margin-top:4px">Save</span>
                    <v-icon>fas fa-save</v-icon>
                  </v-btn>
                  <input type="file" ref="file" style="display: none" @change="onFileChange">

                  <v-btn color="teal" flat v-if="!animalImage" @click="$refs.file.click()">
                    <span style="margin-top:4px">Attach photo</span>
                    <font-awesome-icon icon="camera" size="2x"/>
                  </v-btn>

                  <v-btn color="teal" flat v-if="animalImage" @click="removeImage">
                    <span style="margin-top:4px">Remove photo</span>
                    <font-awesome-icon icon="trash" size="2x"/>
                  </v-btn>
                </v-bottom-nav>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 style="padding-left:6px;padding-top:4px;">
          <v-layout column>
            <v-card>
              <v-layout row wrap style="margin-right:10px;margin-left:10px;margin-top:25px">
                <v-flex xs4>
                 <v-select
                    v-model="animalSpecie"
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
                <v-flex xs8>
                  <v-select
                    v-model="animalBreed"
                    :items="localBreed"
                    :disabled="isDisabled"
                    item-text="name_PT"
                    menu-props="auto"
                    label="Raça"
                    hide-details
                    prepend-icon="map"
                    single-line
                    return-object
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-spacer></v-spacer>

              <v-layout row wrap style="margin-right:10px;margin-left:10px;">
                <v-flex d-flex xs12 sm4>
                  <v-layout column>
                    <v-flex>
                      <v-text-field
                        label="Weight"
                        @keypress="isNumber($event)"
                        v-model="animalWeight"
                      >
                        <v-tooltip slot="append" bottom activator="jkl">
                          <v-icon slot="activator">fas fa-weight-hanging</v-icon>
                        </v-tooltip>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm4>
                  <v-layout column>
                    <v-flex d-flex>
                      <v-text-field
                        label="Height"
                        @keypress="isNumber($event)"
                        v-model="animalWeight"
                      >
                        <v-tooltip slot="append" bottom activator="jkl">
                          <v-icon slot="activator">fas fa-text-height</v-icon>
                        </v-tooltip>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm4>
                  <v-layout column>
                    <v-flex d-flex>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            class=" text-colort"
                            v-model="animalBirthday"
                            label="Birthday"
                            readonly
                            v-on="on"
                          >
                            <v-icon slot="append">fas fa-birthday-cake</v-icon>
                          </v-text-field>
                        </template>

                        <v-date-picker
                          ref="picker"
                          v-model="animalBirthday"
                          no-title
                          :max="deltaDate(new Date(), 0, 0, 0).toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>

            <v-flex d-flex>
              <v-img v-if="animalImage" :src="animalImage" height="375px"></v-img>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

 

<style lang="sass" scoped>
    @import './AnimalCrud.scss';
</style>

<script>
import {animalService } from "@/_services";
import { constants } from 'crypto';
export default {
  props: ["animalObj"],
  name: "Animal-profile-component",
  data() {
    return {
      animalName : "",
      animalSex : "",
      animalDetails : "",
      animalSpecie : "",
      animalBreed : "",
      animalWeight : "",
      animalHeight : "",
      menu: null,
      isDisabled: true,
      animalBirthday : null,
      animalImage: "",
      file: [],
      sex: ["Male", "Female"],
      localBreed: null,
      currentIcon: "fas fa-paw",
      date: new Date().toISOString().substr(0, 10),
      species: null,
      currentGender: null,
      bottomNav: "recent",
    };
  },

  methods: {
    backClick(){
      this.$router.push({name: 'Home'});
    },
    saveClick(){
			var formdata = new FormData();
      formdata.append('file', this.file);
			formdata.append('cloud_name', 'adotaqui');
			formdata.append('upload_preset', 'xs29qdst');
			
			var xhr = new XMLHttpRequest();
			xhr.open('POST', "https://api.cloudinary.com/v1_1/adotaqui/image/upload",true);
      const animal = this.animalObj;
      const animalData = { name: this.animalName,
            gender: this.animalSex == 'Female' ? 2 : 1,
            breed: this.animalBreed,
            height: this.animalHeight,
            weight: this.animalWeight,
            birthday: this.animalBirthday,
            details: this.animalDetails,
            image: this.animalImage
          };
			xhr.onload = function () {
          if (this.responseText){ 
            const responseObj = JSON.parse(this.responseText);
            animalData.image = responseObj.url;
          }
          console.log(animalData);
          if(animal){
              animalService.updateAnimal(animal._id, animalData);
          } else {
              animalService.createAnimal(animalData);
          }
			};
			xhr.send(formdata);		
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    deltaDate(input, days, months, years) {
      var date = new Date(input);
      date.setDate(date.getDate() + days);
      date.setMonth(date.getMonth() + months);
      date.setFullYear(date.getFullYear() + years);
      return date;
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    specieChange(value) {
      this.isDisabled = false;
      this.animalBreed = null;
      this.currentIcon = value.icon;
      this.species.forEach(element => {
        if (element._id == value._id) {
          this.localBreed = element.breeds;
        }
      });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.file = files[0];
      if (!files.length) return;
      this.createImage(this.file);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.animalImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.animalImage = "";
    }
  },
  mounted() {
    if(this.animalObj){
    this.animalName = this.animalObj.name;
    this.animalSex = this.animalObj.gender == 2 ? 'Female' : 'Male';
    this.animalDetails = this.animalObj.details;
    // this.species.forEach(element => {
    //     if (element.name == this.animalSpecie) {
    //       this. = element.breeds;
    //     }
    // });
    this.animalWeight = this.animalObj.weight;
    this.animalHeight = this.animalObj.height;
    this.animalImage = this.animalObj.image;
    this.animalBirthday = this.animalObj.birthday;
    }
  },
  created(){
    animalService.getSpecies().then(species => 
    { 
      this.species = species.species;
      if(this.animalObj){
        this.isDisabled = false;
        this.animalSpecie = this.animalObj.specie.name_PT;
        this.localBreed = this.animalObj.specie.breeds;
        this.animalBreed = this.animalObj.breed.name_PT;
      }
    });
  }
};
</script>
