<template>
  <v-card>
    <v-tabs background-color="deep-purple accent-4" dark fixed-tabs show-arrows height="200">
      <v-tab>
        <v-card height="160px">
          <v-layout>
            <v-flex>
              <v-img height="160px" width="112px" src="https://via.placeholder.com/150"></v-img>
            </v-flex>
            <v-flex>
              <v-card-text>
                <p>testeeeeeeeee</p>
                <p>testeeeeeeeee</p>
                <p>testeeeeeeeee</p>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab>
      <v-tab>
        <v-card height="160px">
          <v-layout>
            <v-flex>
              <v-img height="160px" width="112px" src="https://via.placeholder.com/150"></v-img>
            </v-flex>
            <v-flex>
              <v-card-text>
                <p>testeeeeeeeee</p>
                <p>testeeeeeeeee</p>
                <p>testeeeeeeeee</p>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab>

      <v-tabs-items >
        <v-tab-item >
          <div class="tab-item-wrapper">
          <v-layout  fill-height >
             <v-flex  shrink >
                  <v-layout column >
                    <v-btn class="tablinks" @click="openCity('London')" id="defaultOpen">London</v-btn>
                    <v-btn class="tablinks" @click="openCity('Paris')">Paris</v-btn>
                    <v-btn class="tablinks" @click="openCity('Tokyo')">Tokyo</v-btn>
                  </v-layout>
              </v-flex>
              <v-flex>
             <v-layout fill-height>
                <div id="London" class="tabcontent">
                  <h3>London</h3>
                  <p>London is the capital city of England.</p>
                </div>

                <div id="Paris" class="tabcontent">
                  <h3>Paris</h3>
                  <p>Paris is the capital of France.</p>
                </div>

                <div id="Tokyo" class="tabcontent">
                  <h3>Tokyo</h3>
                  <p>Tokyo is the capital of Japan.</p>
                </div>
            </v-layout>
              </v-flex>
          </v-layout>
        </div>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>BB</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>
<style lang="sass" scoped>
    @import './RequestChat.scss';
</style>


<script>
import { chatService } from "@/_services";

export default {
  name: "AnimalRequests",
  data() {
    return {
        petsChat:[],
        usersChat:[],
    };
  },

  methods: {
    openCity(cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
  },
  mounted() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById("defaultOpen").click();
  },
  created() {
    chatService.getAll().then(petsChat => petsChat.forEach(element => {
      this.petsChat.push(element);
    }));
  }
};
</script>