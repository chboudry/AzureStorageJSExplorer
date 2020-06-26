import { BlobServiceClient } from "@azure/storage-blob";
import { StorageBlob } from "./StorageContainer";

export async function getContainers(props: any) {
  var BlobClient = new BlobServiceClient(
    "https://simpledemostorageaccount.blob.core.windows.net",
    props
  );

  let _chaine: string[] = [];
  for await (const container of BlobClient.listContainers()) {
    _chaine.push(container.name);
  }
  return _chaine;
}

export async function getBlobsFromContainer(props: any, containername: string) {
  var BlobClient = new BlobServiceClient(
    "https://simpledemostorageaccount.blob.core.windows.net",
    props
  );

  var containerClient = BlobClient.getContainerClient(containername);
  let _chaine: StorageBlob[] = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    var obj = {
      containername: containername,
      blobname: blob.name,
      blobsize: blob.properties.contentLength,
    };
    _chaine.push(obj);
  }
  return _chaine;
}
