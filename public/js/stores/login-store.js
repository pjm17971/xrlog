import Dispatcher from "../dispatcher/dispatcher";
import { EventEmitter } from "events";
import { ActionTypes, CHANGE_EVENT } from "../constants/constants";
import assign from "react/lib/Object.assign";

//
// Private data managed by this store is currently authenticated
// user profile
//

let _profile = null;

const LoginStore = assign({}, EventEmitter.prototype, {

    //
    // Boiler plate setup so the store can notify listeners (views) of changes
    //

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    //
    // Public API the store exposes
    //

    getProfile() {
        return _profile;
    },

    isLoggedIn() {
        return !!_profile;
    }
});

//
// Action handlers
//

LoginStore.dispatchToken = Dispatcher.register((payload) => {
    const action = payload.action;
    console.log("Payload:", payload, action);
    switch (action.type) {

        // Handle the user login action
        case ActionTypes.LOGIN:
        console.log("Store: LOGIN", action.profile.email);
            _profile = action.profile;
            LoginStore.emitChange();
            break;

        // Handle the user logout action
        case ActionTypes.LOGOUT:
            console.log("Store: LOGOUT");
            _profile = null;
            LoginStore.emitChange();
            break;

        default:
            break;
    }

});

export default LoginStore;
