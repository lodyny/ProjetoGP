const config = require("config.json");
const jwt = require("jsonwebtoken");
const Animal = require("models/animal");
const Breed = require("models/breed");
var mongoose = require("mongoose");

var ObjectId = mongoose.Types.ObjectId;

module.exports = {
    getAnimals,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    getBreed
}

async function getBreed(breedId){
    let breed = await Breed.findOne({_id: breedId});

    return {
        success: true,
        breed
    }
}

async function getAnimals(){
    let animals = await Animal.find({});

    return {
        success: true,
        animals
    };
}

async function createAnimal(animal){
    let _animal = new Animal(animal);
    let _breed = await Breed.findOne({name: animal.breed});
    _animal.breed = new ObjectId(_breed._id);
    let newAnimal = await _animal.save();
    if (!newAnimal) return;
    newAnimal = JSON.parse(JSON.stringify(newAnimal));
    return {
        success: true,
        animal: newAnimal
      };
}

async function updateAnimal(id, animal){
    let _animal = await Animal.findOne({ _id: id}).exec();
    if (!_animal) return { success: false, message: "Cant find animal"};
    _animal.name = animal.name;
    _animal.gender = animal.gender;
    let _breed = await Breed.findOne({name: animal.breed});
    _animal.breed = new ObjectId(_breed._id);
    _animal.height = animal.height;
    _animal.weight = animal.weight;
    _animal.birthday = animal.birthday;
    _animal.details = animal.details;
    _animal.image = animal.image;
    let newAnimal = await _animal.save();
    if (!newAnimal) return;
    return {
        success: true,
        animal: newAnimal
    }
}

async function deleteAnimal(id){
    let _animal = await Animal.findOne({ _id: id}).exec();
    if (!_animal) return { success: false, message: "Cant find animal"};
    _animal.remove();
    //Animal.deleteOne({ _id: _animal.id});
    return {
        success: true
    };
}