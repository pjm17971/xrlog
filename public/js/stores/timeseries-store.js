import _ from "underscore";
import Dispatcher from "../dispatcher/dispatcher";
import { ActionTypes, LoadStates, CHANGE_EVENT } from "../constants/constants";
import { EventEmitter } from "events";
import { TimeSeries } from "pondjs";
import assign from "react/lib/Object.assign";
import Util from "../utils/util";

//
// Private data managed by this store is a cache of timeseries tiles,
// and the currently requested timerange.
//

const _tiles = {};
let _timerange = null;

const TimeSeriesStore = assign({}, EventEmitter.prototype, {

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

    getTimeseries(prefix) {
        if (!_timerange) {
            return null;
        }
        const indexList = Util.tileKeyList(_timerange);
        const seriesList = [];
        _.each(indexList, tileKey => {
            const key = `${prefix}:${tileKey}`;
            if (_.has(_tiles, key)) {
                seriesList.push(_tiles[key]);
            }
        });
        const merged = TimeSeries.merge({name: "series"}, seriesList);
        const begin = merged.bisect(_timerange.begin());
        const end = merged.bisect(_timerange.end());
        const cropped = merged.slice(begin, end);
        return cropped;
    },

    getTilingStatus(prefix) {
        const tiles = [];
        const indexList = Util.tileKeyList(_timerange);
        _.each(indexList, (tileKey) => {
            const isCached = this.hasCachedTile(`${prefix}:${tileKey}`);
            tiles.push({tile: tileKey, cached: isCached});
        });
        return tiles;
    },

    loadState(prefix) {
        if (!_timerange || !prefix) {
            return LoadStates.INIT;
        }
        const indexList = Util.tileKeyList(_timerange);
        if (indexList.length === 0) {
            return LoadStates.INIT;
        }
        let partLoaded = false;
        let fullyLoaded = true;
        _.each(indexList, index => {
            if (_.has(_tiles, `${prefix}:${index}`)) {
                partLoaded = true;
            } else {
                fullyLoaded = false;
            }
        });
        if (fullyLoaded) {
            return LoadStates.LOADED;
        } else if (partLoaded) {
            return LoadStates.LOADING;
        } else {
            return LoadStates.INIT;
        }
    },

    hasCachedTile(tileKey) {
        return _.has(_tiles, tileKey);
    }
});

//
// Action handlers
//

TimeSeriesStore.dispatchToken = Dispatcher.register((payload) => {
    const action = payload.action;

    switch (action.type) {

        case ActionTypes.RECEIVED_TIMERANGE:
            const { timerange } = action;
            _timerange = timerange;
            TimeSeriesStore.emitChange();
            break;

        // Handle the action
        case ActionTypes.RECEIVED_TIMESERIES_TILE:
            // If we don't already have a tile we store it. We also
            // emit a change to say we got new data. Currenly we don't
            // care if the tile is outside our current timerange.
            const { tile, timeseries } = action;
            const hasData = _.has(_tiles, tile);
            _tiles[tile] = timeseries;
            if (!hasData) {
                TimeSeriesStore.emitChange();
            }
            break;

        default:
            // do nothing
    }
});

export default TimeSeriesStore;
