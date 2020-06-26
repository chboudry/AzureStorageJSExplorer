import React from "react";
import { Table } from "reactstrap";
import withAuthProvider, { AuthComponentProps } from "./AuthProvider";
import { getBlobsFromContainer } from "./StorageService";
import { Link } from "react-router-dom";

interface ContainerState {
  _blobs: string[];
  _containername: string;
}

//extends React.Component<AuthComponentProps, ContainersState>
class StorageContainer extends React.Component<
  AuthComponentProps,
  ContainerState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      _blobs: [],
      _containername: props.match.params.containername,
    };
  }

  async componentDidMount() {
    try {
      // from the path '/course/:slug'
      var blobs = await getBlobsFromContainer(
        this.props,
        this.state._containername
      );
      // Update the array of containers in state
      this.setState({ _blobs: blobs });
    } catch (err) {
      this.props.setError("ERROR", JSON.stringify(err));
    }
  }

  // <renderSnippet>
  render() {
    return (
      <div>
        <h1>{this.state._containername}</h1>
        <br />
        <h2>Blobs</h2>
        <Table>
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state._blobs.map(function (blob: string) {
              return (
                <tr key={blob}>
                  <td>
                    <Link to={"/container/" + blob}>{blob}</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
  // </renderSnippet>
}

export default withAuthProvider(StorageContainer);
//export default withAuthProvider(Containers);
