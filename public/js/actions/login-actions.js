console.log("Login actions");

import Dispatcher from "../dispatcher/dispatcher";
import AuthService from "../services/auth-service";
import { ActionTypes } from "../constants/constants";

export default {

    /**
     * Once we get the profile from the Auth Service this function
     * gets called. We take the profile and dispatch it, to be
     * stored in the login-store.
     */
    getProfileCallback(err, profile) {
        console.log("login-actions: getProfileCallback", err, profile);
        if (err) {
            console.log("Error loading the Profile", err);
            return null;
        } else {
            Dispatcher.dispatch({
                actionType: ActionTypes.LOGIN,
                profile: profile
            });
        }
    },

    login(authHash) {
        console.log("login-actions: login", authHash);
        console.log("login-actions: saveUserToken", authHash);
        AuthService.saveUserToken(authHash);
        console.log("getProfile");
        AuthService.getProfile(this.getProfileCallback);
    },

    showLock() {
        console.log("login-actions: showLock");
        AuthService.showLock(this.showLockCallback);
    },

    /**
     * Once we get the profile from the Auth Service this function
     * gets called. We take the profile and dispatch it, to be
     * stored in the login-store.
     */
    showLockCallback(err, profile, idToken) {
        console.log("login-actions: showLockCallback", err, profile, idToken);
        if (err) {
            console.log("Error loading the Profile", err);
            return null;
        } else {
            const action = {
                type: ActionTypes.LOGIN,
                profile: profile
            };
            Dispatcher.handleAction(action);
        }
    },

    logout() {
        localStorage.removeItem("userToken");
        Dispatcher.handleAction({
            type: ActionTypes.LOGOUT,
            profile: {}
        });
    }
};
