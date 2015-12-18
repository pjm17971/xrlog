import Auth0Lock from "auth0-lock";

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "../constants/login-constants";

const _lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

const AuthService = {

    getProfile(callback) {
        console.log("auth-service: getProfile");
        const idToken = localStorage.getItem("userToken");
        console.log("auth-service: getProfile, user token", idToken);
        _lock.getProfile(idToken, callback);
    },

    /*
    showLock() {
        console.log("auth-service: showLock");
        _lock.show();
    },
    */

    showLock(cb) {
        _lock.show(cb);
    },

    saveUserToken(hash) {
        console.log("auth-service: saveUserToken", hash);
        let idToken = localStorage.getItem("userToken");
        const authHash = _lock.parseHash(hash);
        if (!idToken && authHash) {
            if (authHash.id_token) {
                idToken = authHash.id_token;
                localStorage.setItem("userToken", authHash.id_token);
            }
            if (authHash.error) {
                console.log("Error signing in", authHash);
            }
        }
    }
};

export default AuthService;
