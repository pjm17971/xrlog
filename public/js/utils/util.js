import _ from "underscore";
import { TimeSeries, Generator } from "pondjs";
import ServerActionCreators from "../actions/server-actions.js";

const generator90d = new Generator("90d");
const generator7d = new Generator("7d");
const generator1d = new Generator("1d");

const inflight = {};

module.exports = {

    /**
     * Utility function to get a list of tileKeys given a TimeRange.
     * This controls what tiles (and rollup level) should be fetched
     * for a given time range.
     */
    tileKeyList(timerange) {
        const c = 4;
        if (!timerange) {
            return [];
        }
        const duration = timerange.duration();
        if (duration > 3880000000 / c) { // about 45 days
            // 90 day tiles of 1 hour rollups
            return generator90d.bucketIndexList(timerange);
        } else if (duration > 324000000 / c) { // about 3.75 days
            // 7 day tiles of 5 min rollups
            return generator7d.bucketIndexList(timerange);
        } else {
            // 1 day tiles of 30s data
            return generator1d.bucketIndexList(timerange);
        }
    },

    //
    // Utility file of server actions
    //

    fetchTile(tile) {
        const queryString = `tile=${tile}`;
        const url = `/api/tiles/?${queryString}`;
        if (_.has(inflight, url)) {
            return;
        }
        inflight[url] = true;
        fetch(url)
            .then(resp => {
                if (resp.status === 400) {
                    throw new Error("Data not available.");
                } else if (resp.status === 500) {
                    throw new Error("Error retrieving data.");
                }
                return resp.json();
            })
            .then((data) => {
                const series = new TimeSeries(data);
                if (!series) {
                    return;
                }
                delete inflight[url];
                ServerActionCreators.receiveTimeSeries(tile, series);
            })
            .catch((err) => {
                delete inflight[url];
                console.error(err);
            });
    },

    //
    // Utility file of server actions
    //

    fetchSourceList() {
        const url = `/api/sources/`;
        fetch(url)
            .then(resp => {
                if (resp.status === 400) {
                    throw new Error("Data not available.");
                } else if (resp.status === 500) {
                    throw new Error("Error retrieving data.");
                }
                return resp.json();
            })
            .then((sourceList) => {
                ServerActionCreators.receiveSourceList(sourceList);
            })
            .catch((err) => {
                console.error(err);
                // TrafficServerActions.errorFetchingTraffic(
                //     demo,
                //    "flow",
                //    err.toString()
                // );
            });
    },
};
