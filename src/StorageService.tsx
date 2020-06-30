import { config } from "./Config";
import { BlobServiceClient } from "@azure/storage-blob";
import { StorageBlob } from "./StorageContainer";

export async function getContainers(props: any) {
  var BlobClient = new BlobServiceClient(config.storageAccount, props);

  let _chaine: string[] = [];
  for await (const container of BlobClient.listContainers()) {
    _chaine.push(container.name);
  }
  return _chaine;
}

export async function getBlobsFromContainer(props: any, containername: string) {
  var BlobClient = new BlobServiceClient(config.storageAccount, props);

  var containerClient = BlobClient.getContainerClient(containername);
  let _chaine: StorageBlob[] = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    _chaine.push({
      containername: containername,
      blobname: blob.name,
      blobsize: blob.properties.contentLength,
    });
  }
  return _chaine;
}

export async function downloadBlob(
  props: any,
  containername: string,
  blobname: string
) {
  var BlobClient = new BlobServiceClient(config.storageAccount, props);

  var containerClient = BlobClient.getContainerClient(containername);

  var blockBlobClient = containerClient.getBlobClient(blobname); //https://docs.microsoft.com/en-us/javascript/api/@azure/storage-blob/blockblobclient?view=azure-node-latest#download-number--number--blobdownloadoptions-

  blockBlobClient
    .download()
    .then((resp) => {
      return resp.blobBody;
    })
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = blobname;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    });
}
