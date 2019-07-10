import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const chatService = {
    getAll,
    getChatById,
    sendMessage,
    createChat
};

function getAll() {
    return fetch(`${config.apiUrl}/chats`, requestOptions.get())
    .then(handleResponse);
}

function getChatById(id) {
    return fetch(`${config.apiUrl}/chats/${id}`, requestOptions.get())
    .then(handleResponse);
}

function createChat(requestId, user, animal) {
    return fetch(`${config.apiUrl}/chats`, requestOptions.post({requestId, user, animal}))
        .then(handleResponse)
        .then(request => { return request;});
}

function sendMessage(id, message, sender) {
    return fetch(`${config.apiUrl}/chats/${id}/createMessage`, requestOptions.post({message:{message, sender}}))
        .then(handleResponse)
        .then(request => { return request;});
}