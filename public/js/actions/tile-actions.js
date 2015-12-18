import Dispatcher from "../dispatcher/dispatcher";
import { ActionTypes } from "../constants/constants";

/**
 * The actions defined here are for sending server responses.
 */

module.exports = {

    receiveTimeSeries(tile, series) {
        const action = {
            type: ActionTypes.RECEIVED_TIMESERIES_TILE,
            tile: tile,
            timeseries: series
        };
        Dispatcher.handleAction(action);
    },

    receiveSourceList(sourceList) {
        const action = {
            type: ActionTypes.RECEIVED_SOURCELIST,
            sourceList: sourceList
        };
        Dispatcher.handleAction(action);
    }

};
