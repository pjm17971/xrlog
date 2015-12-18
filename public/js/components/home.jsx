import React from "react";
import LoginStore from "../stores/login-store";
import About from "./about";
import Dashboard from "./dashboard";

export default React.createClass({

    getInitialState() {
        return {
            user: {
                profile: LoginStore.getProfile(),
                isLoggedIn: LoginStore.isLoggedIn()
            }
        };
    },

    componentWillMount() {
        LoginStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        const profile = LoginStore.getProfile();
        const isLoggedIn = LoginStore.isLoggedIn();
        this.setState({
            user: {profile, isLoggedIn}
        });
    },

    render() {
        if (this.state.user.isLoggedIn) {
            return (
                <Dashboard profile={this.state.user} />
            );
        } else {
            return (
                <About />
            );
        }
    }
});
