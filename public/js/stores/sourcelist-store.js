import Dispatcher from "../dispatcher/dispatcher";
import { EventEmitter } from "events";
import { ActionTypes, LoadStates, CHANGE_EVENT } from "../constants/constants";
import assign from "react/lib/Object.assign";

//
// Private data managed by this store is the list of data sources available
//

let _sourceList = "";
let _loadState = LoadStates.INIT;

const SourceListStore = assign({}, EventEmitter.prototype, {

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

    loadState() {
        return _loadState;
    },

    getSourceList() {
        return _sourceList;
    }
});

//
// Action handlers
//

SourceListStore.dispatchToken = Dispatcher.register((payload) => {
    const action = payload.action;

    switch (action.type) {

        // Handle the action
        case ActionTypes.RECEIVED_SOURCELIST:
            _sourceList = action.sourceList;
            _loadState = LoadStates.LOADED;
            SourceListStore.emitChange();
            break;

        default:
            // do nothing
    }

});

export default SourceListStore;
