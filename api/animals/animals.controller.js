const express = require("express");
const router = express.Router();
const animalService = require("./animal.service");
const authorize = require("_helpers/authorize");

// routes
router.get("/", getAnimals); // obter todos
router.post("/:id", updateAnimal); //criar ou upd animal
router.post("/", updateAnimal);
router.delete("/:id", deleteAnimal); // apagar animal

module.exports = router;

function getAnimals(req, res, next) {
    animalService.getAnimals()
        .then(result => (result ? res.json(result) : res.status(400).json({
            success: false
        })))
        .catch(err => next(err));
}

function updateAnimal(req, res, next) {
    const id = req.params.id;
    if (id == null)
        animalService.
        createAnimal(req.body.animal)
        .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
        .catch(err => next(err));
    else
        animalService
        .updateAnimal(id, req.body.animal)
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