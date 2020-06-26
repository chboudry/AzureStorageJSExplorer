//import { config } from "./Config";
//import { InteractiveBrowserCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";

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
  let _chaine: string[] = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    _chaine.push(blob.name);
  }
  return _chaine;
}
