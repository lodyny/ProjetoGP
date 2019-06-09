<template>
    <div class="animal-card-component">
        <v-card tile>
                        <v-card-media :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="250px">
                        </v-card-media>
                        <v-card-title primary-title class="ma-0 pa-0 justify-center">
                            <div>
                                <h4 class="card-tile" style="margin-top:10px">{{animal.name}}</h4>
                            </div>
                        </v-card-title>
                        <v-card-actions><v-spacer></v-spacer>
                            <span style="position:absolute;right:0;bottom:0;margin-right:5px;color:#E75480;font-size:18px;">{{animal.sex == 1 ? 'M' : 'F' }}</span>
                        </v-card-actions>
                    </v-card>
    </div>
</template>

<style lang="sass" scoped>
    @import './index.scss';
</style>

<script>


export default {
    props: ['animal'],
    name: 'Animal-card-component',
    data() {
        return {
            
        };
    },
    
    methods: {
        
    },
    mounted() {
        
    },
};
</script>
