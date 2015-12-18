import React from "react";
import { Link } from "react-router";
import LoginActions from "../actions/login-actions";
import LoginStore from "../stores/login-store";

import LoggedIn from "./loggedin";
import Login from "./login";

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

    showLock() {
        LoginActions.showLock();
    },

    logout() {
        LoginActions.logout();
    },

    render() {
        let secureLinks;
        if (this.state.user.isLoggedIn) {
            secureLinks = (
                null
                /*
                  Links that require the user to be logged in
                 */
            );
        }

        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <ul className = "nav navbar-nav">
                        <li><Link to="app">Home</Link></li>
                        {secureLinks}
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Login
                                user={this.state.user}
                                showLock={this.showLock}
                                logout={this.logout}/>
                        </li>
                    </ul>
                    <LoggedIn profile={this.state.user.profile}/>
                </div>
            </nav>
        );
    }
});
