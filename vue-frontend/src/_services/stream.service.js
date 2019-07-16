import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const streamService = {
    getAll
};

function getAll() {
    return fetch(`${config.apiUrl}/streams`, requestOptions.get())
    .then(handleResponse);
}