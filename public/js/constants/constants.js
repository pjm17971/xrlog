import keyMirror from "keymirror";

module.exports = {

    ActionTypes: keyMirror({
        LOGIN: null,
        LOGOUT: null,
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    LoadStates: keyMirror({
        INIT: null,
        LOADING: null,
        LOADED: null,
    }),

    CHANGE_EVENT: "change"

};
