import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const animalService = {
    getAll,
    getById,
    getSpecies,
    getBreedByAnimalId,
    createRequest,
    acceptAnimalRequest,
    refuseAnimalRequest,
    deleteAnimalRequest,
    returnAnimalRequest,
    returnAnimal
};

function getAll() {
    return fetch(`${config.apiUrl}/animals`, requestOptions.get())
    .then(handleResponse);
}

function getSpecies() {
    return fetch(`${config.apiUrl}/animals/types/all`, requestOptions.get())
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

function createRequest(email, details, animal) {
    return fetch(`${config.apiUrl}/users/createRequest`, requestOptions.post({email, request:{details, animal}}))
        .then(handleResponse)
        .then(request => { return request;});
}

function acceptAnimalRequest(userId, requestId) {
    return fetch(`${config.apiUrl}/users/${userId}/requests/${requestId}/accept`, requestOptions.post())
        .then(handleResponse);
}

function refuseAnimalRequest(userId, requestId) {
    return fetch(`${config.apiUrl}/users/${userId}/requests/${requestId}/refuse`, requestOptions.post())
        .then(handleResponse);
}

function deleteAnimalRequest(userId, requestId) {
    return fetch(`${config.apiUrl}/users/${userId}/requests/${requestId}/delete`, requestOptions.delete())
        .then(handleResponse);
}

function returnAnimalRequest(userId, requestId) {
    return fetch(`${config.apiUrl}/users/${userId}/requests/${requestId}/return`, requestOptions.post())
        .then(handleResponse);
}

function returnAnimal(userId, animalId) {
    return fetch(`${config.apiUrl}/users/${userId}/animal/${animalId}/return`, requestOptions.delete())
        .then(handleResponse);
}