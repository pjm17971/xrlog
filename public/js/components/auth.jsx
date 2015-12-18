import React from "react";
import History from "history";
import LoginActions from "../actions/login-actions";

export default React.createClass({

    mixins: [ History ],

    /**
     * When this component tries to mount, we've been directed here by
     * the "/access_token*" route, which occurs when we get the callback
     * from Auth0. In response we call an out login() action and then
     * navigate (componentDidMount()) to the app root route.
     *
     * TODO: Can we just have the callback route just call the action
     * directly in React Router 1.0?
     */
    componentWillMount() {
        const hash = window.location.hash;
        console.log("Auth.jsx", hash);
        LoginActions.login(hash);
    },

    componentDidMount() {
        this.props.history.pushState(null, "/");
    },

    render() {
        return (
            <div>
                Redirecting...
            </div>
        );
    }
});
