<template>
    <div>
        <h1>Register</h1>
        <!-- <p>You're logged in with Vue.js & JWT!!</p>
        <p>Your role is: <strong>{{currentUser.role}}</strong>.</p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>
            Current user from secure api end point:
            <ul v-if="userFromApi">
                <li>{{userFromApi.name}}</li>
            </ul>
        </div> -->
    </div>
</template>

<script>
import { router } from '@/_helpers';
import { authenticationService } from '@/_services';

export default {
    created () {
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            return router.push('/');
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.$route.query.returnUrl || '/';
    }
    // data () {
    //      return {
    //          currentUser: authenticationService.currentUserValue,
    //          userFromApi: null
    //     };
    // },
    // created () {
    //      userService.getById(this.currentUser.id).then(user => this.userFromApi = user);
    // }
};
</script>