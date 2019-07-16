<template>
<div>
    <v-container bg grid-list-md text-xs-center >
        <v-layout row wrap align-center >
          <v-flex shrink style="margin:auto;"> 
  <v-carousel :cycle="cycleOp">
    <v-carousel-item
      v-for="(item,i) in streams.data.data"
      :key="i"
      :src="item.src"
    >
    
    <iframe :src="'https://player.twitch.tv/?channel=' + item.user_name"  frameborder="0" allowfullscreen="true" scrolling="no" height="100%" width="620"></iframe><a :href="'https://www.twitch.tv/'+user_name+'?tt_content=text_link&tt_medium=live_embed'" style="padding:2px 0px 4px;  font-weight:normal; font-size:10px; text-decoration:underline;"></a>
    
    </v-carousel-item>
  </v-carousel>
  </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<style lang="sass" scoped>
    @import './Streams.scss';
</style>

<script>
import { streamService } from "@/_services";

export default {
    name: 'Streams',
    data() {
        return {
            streams: null,
            cycleOp: false
        };
    },
    
    methods: {
        
    },
    mounted() {
        streamService.getAll().then(streams => (this.streams = streams));
    },
};
</script>
