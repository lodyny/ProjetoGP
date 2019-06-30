import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { requestOptions, handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions.post({ email, password }))
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function changeUser(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);
}

function register(email, password, name, birthdate, phonenumber) {
    console.log(password);
    return fetch(`${config.apiUrl}/users/`, requestOptions.post({ email, password, name, birthdate, phonenumber }))
        .then(handleResponse)
        .then(user => { return user;});
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
