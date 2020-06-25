// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import withAuthProvider, { AuthComponentProps } from "./AuthProvider";
import NavBar from "./NavBar";
import ErrorMessage from "./ErrorMessage";
import Welcome from "./Welcome";
import StorageContainers from "./StorageContainers";
import StorageContainer from "./StorageContainer";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component<AuthComponentProps> {
  render() {
    let error = null;
    if (this.props.error) {
      error = (
        <ErrorMessage
          message={this.props.error.message}
          debug={this.props.error.debug}
        />
      );
    }

    // <renderSnippet>
    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={this.props.isAuthenticated}
            authButtonMethod={
              this.props.isAuthenticated ? this.props.logout : this.props.login
            }
            user={this.props.user}
          />
          <Container>
            {error}
            <Route
              exact
              path="/"
              render={(props) => (
                <Welcome
                  {...props}
                  isAuthenticated={this.props.isAuthenticated}
                  user={this.props.user}
                  authButtonMethod={this.props.login}
                />
              )}
            />
            <Route
              path="/container/:containername"
              render={(props) =>
                this.props.isAuthenticated ? (
                  <StorageContainer {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/containers"
              render={(props) =>
                this.props.isAuthenticated ? (
                  <StorageContainers {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Container>
        </div>
      </Router>
    );
    // </renderSnippet>
  }
}

export default withAuthProvider(App);
