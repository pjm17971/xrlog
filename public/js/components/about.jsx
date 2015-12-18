import React from "react";

export default React.createClass({
    render() {
        return (
            <div className="jumbotron">
                <h1>XRLog</h1>
                <p>XRLog is a time based content management system. You connect XRlog to
                different data sources and curate that data into different views which
                you can share or archive.</p>

                <p>Initially the goal is to create an exercise blog. You might want to
                have a weekly page that shows a combination of strava activities along
                with text notes.</p>
            </div>
        );
    }
});
