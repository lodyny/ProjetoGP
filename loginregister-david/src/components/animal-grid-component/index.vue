<template>
<div class="animal-grid-component">
        <v-container grid-list-xl>
            <v-layout row wrap center justify-center>
                <v-flex xs6 sm4 md3 xl2 class="lg5-custom"  v-for="n in 12" v-bind:key="n">
                    <AnimalCard v-bind:animal="{name:'doge', sex:1}"></AnimalCard>
                </v-flex>
            </v-layout>
        </v-container>
</div>

</template>

<style lang="sass" scoped>

@import './index.scss';
</style>

<script>
import AnimalCard from '../animal-card-component/index'

export default {
    name: 'Animal-grid-component',
    components: {
        AnimalCard
    },
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
