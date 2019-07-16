const express = require("express");
const router = express.Router();
const animalService = require("./animal.service");
const authorize = require("_helpers/authorize");

// routes
router.get("/", getAnimals); // Obter todos os animais
router.post("/:id", updateAnimal); // Update animal 
router.post("/", updateAnimal); // Criar um animal
router.delete("/:id", deleteAnimal); // Apagar um animal
router.get("/breed/:id", getBreed); // Obter raças
router.get("/:id", getAnimal); // Obter um animal

router.get("/types/all", getTypes); // Obter todas as Especies e Raças

module.exports = router;

function getTypes(req, res, next){
    animalService.getTypes()
    .then(result => (result ? res.json(result) : res.status(400).json({
        success: false
    })))
    .catch(err => next(err));
}

function getBreeds(req, res, next){
    animalService.getBreeds(req.params.id)
    .then(result => (result ? res.json(result) : res.status(400).json({
        success: false
    })))
    .catch(err => next(err));
}

function getAnimal(req, res, next){
    animalService.getAnimal(req.params.id)
    .then(result => (result ? res.json(result) : res.status(400).json({
        success: false
    })))
    .catch(err => next(err));
}

function getAnimals(req, res, next) {
    animalService.getAnimals()
        .then(result => (result ? res.json(result) : res.status(400).json({
            success: false
        })))
        .catch(err => next(err));
}

function getBreed(req, res, next){
    animalService.getBreed(req.params.id).then(result => (result ? res.json(result) : res.status(400).json({success : false})))
    .catch(err => next(err));
}

function updateAnimal(req, res, next) {
    const id = req.params.id;
    if (id == null)
        animalService.
        createAnimal(req.body)
        .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
        .catch(err => next(err));
    else
        animalService
        .updateAnimal(id, req.body)
        .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
        .catch(err => next(err));
}

function deleteAnimal(req, res, next) {
    const id = req.params.id;
    animalService.
    deleteAnimal(id)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
    .catch(err => next(err));
}