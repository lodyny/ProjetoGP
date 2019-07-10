import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const notificationService = {
    readNotification,
    deleteNotification
};

function readNotification(userId, notificationId) {
    return fetch(`${config.apiUrl}/users/${userId}/notifications/${notificationId}`, requestOptions.post())
    .then(handleResponse)
        .then(request => { console.log(request)});
}

function deleteNotification(userId, notificationId) {
    return fetch(`${config.apiUrl}/users/${userId}/notifications/${notificationId}`, requestOptions.delete())
    .then(handleResponse)
        .then(request => { console.log(request)});
}