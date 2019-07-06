import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const chatService = {
    getAll,
    getChatById,
    sendMessage
};

function getAll() {
    return fetch(`${config.apiUrl}/chats`, requestOptions.get())
    .then(handleResponse);
}

function getChatById(id) {
    return fetch(`${config.apiUrl}/chats/${id}`, requestOptions.get())
    .then(handleResponse);
}

function sendMessage(id, message, sender) {
    console.log(sender);
    return fetch(`${config.apiUrl}/chats/${id}/createMessage`, requestOptions.post({message:{message, sender}}))
        .then(handleResponse)
        .then(request => { return request;});
}