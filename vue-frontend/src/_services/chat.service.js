import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const chatService = {
    getAll
};

function getAll() {
    return fetch(`${config.apiUrl}/chats`, requestOptions.get())
    .then(handleResponse);
}