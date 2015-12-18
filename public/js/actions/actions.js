import _ from "underscore";
import Dispatcher from "../dispatcher/dispatcher";
import {ActionTypes} from "../constants/constants";
import Util from "../utils/util";
import Store from "../stores/timeseries-store";

/**
 * The actions defined here are the interface between the view
 * components (or router) and the dispatcher. Server actions are
 * also initiated here.
 */

module.exports = {

    getTraffic(prefix, timerange) {
        // Action
        Dispatcher.handleViewAction({
            type: ActionTypes.RECEIVED_TIMERANGE,
            timerange: timerange,
        });

        const indexList = Util.tileKeyList(timerange);
        _.each(indexList, index => {
            const tileKey = `${prefix}:${index}`;
            if (!Store.hasCachedTile(tileKey)) {
                Util.fetchTile(tileKey);
            }
        });
    },

    getSourceList() {
        // Dependent server requests
        Util.fetchSourceList();
    },
};
