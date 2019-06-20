import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const animalService = {
    getAll,
    getById,
    getBreedByAnimalId
};

function getAll() {
    return fetch(`${config.apiUrl}/animals`, requestOptions.get())
    .then(handleResponse);
}

function getBreedByAnimalId(id) {
    return fetch(`${config.apiUrl}/animals/breed/${id}`, requestOptions.get())
    .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/animals/${id}`, requestOptions.get())
        .then(handleResponse);
}