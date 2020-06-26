import React from "react";
import { Table, Container } from "reactstrap";
import withAuthProvider, { AuthComponentProps } from "./AuthProvider";
import { getBlobsFromContainer } from "./StorageService";
import { Link } from "react-router-dom";

export interface StorageBlob {
  containername: String;
  blobname: string;
  blobsize: number | undefined;
}

interface ContainerState {
  _blobs: StorageBlob[];
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
      this.setState({ _blobs: [...this.state._blobs, ...blobs] });
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
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>
            {this.state._blobs.map(function (blob: StorageBlob) {
              return (
                <tr key={blob.blobname}>
                  <td>
                    <Link
                      to={
                        "/container/" + blob.containername + "/" + blob.blobname
                      }
                    >
                      {blob.blobname}
                    </Link>
                  </td>
                  <td>{blob.blobsize}</td>
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
