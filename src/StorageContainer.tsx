import React from "react";
import { Table } from "reactstrap";
import withAuthProvider, { AuthComponentProps } from "./AuthProvider";
import { getBlobsFromContainer } from "./StorageService";
import { Link } from "react-router-dom";

interface ContainerState {
  _containers: string[];
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
      _containers: [],
      _containername: props.containername,
    };
  }

  async componentDidMount() {
    try {
      // from the path '/course/:slug'
      // var containers = await getBlobsFromContainer(this.state._containername);
      // Update the array of containers in state
      //this.setState({ _containers: containers });
    } catch (err) {
      this.props.setError("ERROR", JSON.stringify(err));
    }
  }

  // <renderSnippet>
  render() {
    return (
      <div>
        <h1>Blobs</h1>
        <Table>
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state._containers.map(function (container: string) {
              return (
                <tr key={container}>
                  <td>
                    <Link to={"/container/" + container}>{container}</Link>
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
