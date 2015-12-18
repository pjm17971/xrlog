import React from "react";
import Header from "./header";

/**
 * Main container for the app UI. Contains the header and a container body
 * which contains the content of the particular route. The header contains the
 * login and logout links, which evoke the appropiate actions for authorization.
 */
export default React.createClass({

    render() {
        console.log("App");
        return (
            <div>
                <Header/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
