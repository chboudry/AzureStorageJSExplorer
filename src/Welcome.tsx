// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <WelcomeSnippet>
import React from "react";
import { Button, Jumbotron } from "reactstrap";

interface WelcomeProps {
  isAuthenticated: boolean;
  authButtonMethod: any;
  user: any;
}

interface WelcomeState {
  isOpen: boolean;
}

function WelcomeContent(props: WelcomeProps) {
  // If authenticated, greet the user
  if (props.isAuthenticated) {
    return (
      <div>
        <h4>Welcome {props.user.displayName}!</h4>
        <p>Use the navigation bar at the top of the page to get started.</p>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return (
    <Button color="primary" onClick={props.authButtonMethod}>
      Click here to sign in
    </Button>
  );
}

export default class Welcome extends React.Component<
  WelcomeProps,
  WelcomeState
> {
  render() {
    return (
      <Jumbotron>
        <h1>Azure Storage Js Explorer</h1>
        <p className="lead">
          This application provides a read only access to your Azure Storage
          Account Containers using Azure Active Directory Authentication.
        </p>
        <WelcomeContent
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          authButtonMethod={this.props.authButtonMethod}
        />
      </Jumbotron>
    );
  }
}
// </WelcomeSnippet>