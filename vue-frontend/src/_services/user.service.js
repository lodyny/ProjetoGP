import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    getAll,
    getById,
    updateRole,
    checkUserAnimalRequest,
    updateUser,
    updateState
};

function getAll() {
    return fetch(`${config.apiUrl}/users`, requestOptions.get())
    .then(handleResponse);
}


function checkUserAnimalRequest(userId, animalId) {
    return fetch(`${config.apiUrl}/users/${userId}/checkAnimalRequest/${animalId}`, requestOptions.get())
    .then(handleResponse);
}

function getById(id) {
     return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get())
        .then(handleResponse).then(user => {return user;});
}

function updateRole(role, id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.post({userData: {role:role}}))
        .then(handleResponse)
        .then(request => { return request;});
}

function updateState(banned, id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.post({userData: {banned:banned}}))
        .then(handleResponse)
        .then(request => { return request;});
}

function updateUser(userId, userData) {
    return fetch(`${config.apiUrl}/users/${userId}`, requestOptions.post({userData:userData}))
        .then(handleResponse)
        .then(request => { return request;});
}