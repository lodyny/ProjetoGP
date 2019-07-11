<template>
  <div class="AnimalAdoption">
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card style="margin-top:-2px;padding-bottom:60px;height:570px;">
                <v-card-title class="justify-center" style="margin-top:15px; margin-bottom:-20px">
                  <h1>Adoptar {{current_animal.gender == 1 ? 'o' : 'a'}} {{current_animal.name}}</h1>
                </v-card-title>
                <v-img :src="current_animal.image" height="490px" contain></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6>
          <v-layout column>
            <v-card style="padding-bottom:60px;height:570px;">
              <v-card-title class="justify-center align-center"></v-card-title>
              <v-container id="scroll-target" style="max-height: 400px;" class="scroll-y"></v-container>
              <v-textarea
                style="padding-left:20px;padding-right:20px;margin-top:-27px; ma-0 pa-0"
                label="Detalhes do pedido"
                counter
                class="mb-0 pa-0;"
                maxlength="700"
                no-resize
                auto-grow
                v-if="availability"
                v-model="adoptionDetails"
              ></v-textarea>
              <v-alert :value="true" color="warning" outline icon="warning" v-if="!availability">
                <p>You can only apply once to a animal</p>
                <span v-if="!hasChat">
                Your request is still pending
                </span>
                  <span v-if="hasChat">
                There is a chat open for the request
                </span>
                <v-btn
                  v-if="hasChat"
                  @click="redirectToChat()"
                  color="warning"
                  style="float:right; margin-right:20px; margin-top:30px;"
                >Go to animal chat</v-btn>
              </v-alert>
              <v-btn
                color="teal"
                @click="submit()"
                v-if="availability"
                style="float:right; margin-right:20px; margin-top:30px;"
              >Submeter pedido</v-btn>
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
  props: ["current_animal"],
  data() {
    return {
      currentUser: null,
      menu: false,
      adoptionDetails: null,
      availability: false,
      hasChat: false
    };
  },

  methods: {
    redirectToChat(){
    this.$router.push({
          name: "Myconversations"
        });
    },
    submit() {
      animalService
        .createRequest(
          this.currentUser.email,
          this.adoptionDetails,
          this.current_animal._id
        )
        .then(request => {
          if (request.success === true)
            this.$router.push({
              name: "Home",
              params: { outMessage: "Adoption request success!" }
            });
        });
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
    userService
      .checkUserAnimalRequest(this.currentUser.id, this.current_animal._id)
      .then(request => (this.availability = request.availability, this.hasChat = request.hasChat));
  }
};
</script>
