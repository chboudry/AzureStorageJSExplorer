import React from "react";
import { Table } from "reactstrap";
import withAuthProvider, { AuthComponentProps } from "./AuthProvider";
import { getBlobsFromContainer, downloadBlob } from "./StorageService";

export interface StorageBlob {
  containername: string;
  blobname: string;
  blobsize: number | undefined;
}

interface ContainerState {
  _blobs: StorageBlob[];
  _containername: string;
  // _props: any;
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
      // _props: null,
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
      //  this.setState({ _props: this.props });
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
            {this.state._blobs.map((blob: StorageBlob) => {
              return (
                <tr key={blob.blobname}>
                  <td>
                    <p
                      onClick={() =>
                        downloadBlob(
                          this.props,
                          blob.containername,
                          blob.blobname
                        )
                      }
                    >
                      {blob.blobname}
                    </p>
                  </td>
                  <td>{blob.blobsize}</td>
                </tr>
              );
            }, this)}
          </tbody>
        </Table>
      </div>
    );
  }
  // </renderSnippet>
}

export default withAuthProvider(StorageContainer);
//export default withAuthProvider(Containers);
