import React from "react";

export default React.createClass({

    propTypes: {
        profile: React.PropTypes.object.isRequired
    },

    render() {
        if (this.props.profile) {
            return (
                <p className="navbar-text navbar-right">
                    {this.props.profile.email}
                </p>
            );
        } else {
            return (
                <p className="navbar-text navbar-right">
                    Not logged in
                </p>
            );
        }
    }
});
