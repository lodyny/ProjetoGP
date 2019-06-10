<template>
<div class="animal-grid-component">
    <Profile v-bind:animalObj="selectedAnimal" v-if="showAnimalProfile" @close="onCloseProfile" @next="onNextProfile" @previous="onPreviousProfile"/>
        <v-container grid-list-xl v-if="!showAnimalProfile">
            <v-layout row wrap center justify-center>
                <v-flex xs6 sm4 md3 xl2 class="lg5-custom"  v-for="(animal, idx) in animallist" v-bind:key="idx">
                    <AnimalCard v-bind:animal="animal" 
                    @selectAnimal="cardSelected(animal, idx)"
                    ></AnimalCard>
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
import Profile from '../animal-profile-component/index'

export default {
    name: 'Animal-grid-component',
    
    components: {
        AnimalCard, Profile
    },
    data() {
        return {
            showAnimalProfile: false,
            selectedAnimal : null,
            selectedAnimalIndex: null,
            animallist : [{ name  : 'Chubby',
            gender : 1,
            breed  : { name : 'German Shephard', name_PT : 'Pastor Alemão' },
            height : 100,
            weight : 100,
            birthday : '10/02/2005',
            details: 'this is Chubby',
            image : 'https://avatars3.githubusercontent.com/u/16657688?s=460&v=4'}, 
            { name  : 'Irmão do Chubby',
            gender : 1,
            breed  : { name : 'German Shephard', name_PT : 'Pastor Alemão' },
            height : 100,
            weight : 100,
            birthday : '10/02/2005',
            details: 'this is Chubby',
            image : 'https://www.adopta-me.org/media/image/thumb/85119638-Beau__3_.jpg'},
            { name  : 'Irmã do Chubby',
            gender : '0',
            breed  : { name : 'German Shephard', name_PT : 'Pastor Alemão' },
            height : 100,
            weight : 100,
            birthday : '10/02/2005',
            details: 'this is Chubby',
            image : 'https://avatars3.githubusercontent.com/u/16657688?s=460&v=4'},
            { name  : 'Prima do Chubby',
            gender : '0',
            breed  : { name : 'German Shephard', name_PT : 'Pastor Alemão' },
            height : 100,
            weight : 100,
            birthday : '10/02/2005',
            details: 'this is Chubby',
            image : 'https://avatars3.githubusercontent.com/u/16657688?s=460&v=4'},
            { name  : 'Primo do Chubby',
            gender : '1',
            breed  : { name : 'German Shephard', name_PT : 'Pastor Alemão' },
            height : 100,
            weight : 100,
            birthday : '10/02/2005',
            details: 'this is Chubby',
            image : 'https://avatars3.githubusercontent.com/u/16657688?s=460&v=4'},
            { name  : 'Avó do Chubby',
            gender : '0',
            breed  : { name : 'German Shephard', name_PT : 'Pastor Alemão' },
            height : 100,
            weight : 100,
            birthday : '10/02/2005',
            details: 'this is Chubby',
            image : 'https://avatars3.githubusercontent.com/u/16657688?s=460&v=4'},
            { name  : 'Avô do Chubby',
            gender : '1',
            breed  : { name : 'German Shephard', name_PT : 'Pastor Alemão' },
            height : 100,
            weight : 100,
            birthday : '10/02/2005',
            details: 'this is Chubby',
            image : 'https://avatars3.githubusercontent.com/u/16657688?s=460&v=4'}]
        };
    },

    methods: {
        cardSelected(animal, idx){
            console.log('message from child', animal);
            this.selectedAnimal = animal;
            this.selectedAnimalIndex = idx;
            console.log(idx);
            this.$emit('closeBar');
            this.showAnimalProfile = true;
        },
        onCloseProfile(){
            console.log('emit open');
            this.showAnimalProfile = false;
            this.$emit('openBar');
        },
        onNextProfile(){
            if(this.selectedAnimalIndex < this.animallist.length - 1){
                this.selectedAnimalIndex++;
            } else {
                this.selectedAnimalIndex = 0;
            }
            this.selectedAnimal = this.animallist[this.selectedAnimalIndex];
        },
        onPreviousProfile(){
            if(this.selectedAnimalIndex > 0){
                this.selectedAnimalIndex--;
            } else {
                this.selectedAnimalIndex = this.animallist.length - 1;
            }
            this.selectedAnimal = this.animallist[this.selectedAnimalIndex];
        }
    },
    mounted() {

    },
};
</script>
