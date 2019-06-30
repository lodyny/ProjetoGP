import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    getAll,
    getById,
    updateRole
};

function getAll() {
    return fetch(`${config.apiUrl}/users`, requestOptions.get())
    .then(handleResponse);
}

function getById(id) {
     return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get())
        .then(handleResponse).then(user => {return user;});
}



function updateRole(role, id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.post({role:role}))
        .then(handleResponse)
        .then(request => { return request;});
}