const express = require("express");
const router = express.Router();
const animalService = require("./animal.service");
const authorize = require("_helpers/authorize");

// routes
router.get("/", getAnimals); // obter todos
router.post("/:id", updateAnimal); //criar ou upd animal
router.post("/", updateAnimal);
router.delete("/:id", deleteAnimal); // apagar animal
router.get("/breed/:id", getBreed);
router.get("/:id", getAnimal);

module.exports = router;

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