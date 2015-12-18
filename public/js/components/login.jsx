import React from "react";

export default React.createClass({

    propTypes: {
        user: React.PropTypes.object.isRequired,
        showLock: React.PropTypes.func.isRequired,
        logout: React.PropTypes.func.isRequired
    },

    render() {
        if (!this.props.user.isLoggedIn) {
            return (
                <a href="#" onClick={this.props.showLock}>Login</a>
            );
        } else {
            return (
                <a href="#" onClick={this.props.logout}>Logout</a>
            );
        }
    }
});
