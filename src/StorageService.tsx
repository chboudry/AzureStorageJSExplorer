import { config } from "./Config";
import { InteractiveBrowserCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";

export async function getContainers(props: any) {
  /*let optionsvalue = {
    tenantId: config.tenantId,
    clientId: config.appId,
    redirectUri: config.redirectUri2,
  };
  var identity = new InteractiveBrowserCredential(optionsvalue);*/

  var BlobClient = new BlobServiceClient(
    "https://simpledemostorageaccount.blob.core.windows.net",
    props
  );

  let _chaine: string[] = [];
  for await (const container of BlobClient.listContainers()) {
    _chaine.push(container.name);
  }
  return _chaine;

  // When using AnonymousCredential, following url should include a valid SAS or support public access
  //`https://${account}.blob.core.windows.net`,
  //sharedKeyCredential;
}

export async function getBlobsFromContainer(containername: string) {
  let optionsvalue = {
    tenantId: config.tenantId,
    clientId: config.appId,
    redirectUri: config.redirectUri2,
  };
  var identity = new InteractiveBrowserCredential(optionsvalue);

  var BlobClient = new BlobServiceClient(
    "https://simpledemostorageaccount.blob.core.windows.net",
    identity
  );

  let _chaine: string[] = [];
  for await (const container of BlobClient.listContainers()) {
    _chaine.push(container.name);
  }
  return _chaine;

  // When using AnonymousCredential, following url should include a valid SAS or support public access
  //`https://${account}.blob.core.windows.net`,
  //sharedKeyCredential;
}

/*
export async function getContainers(accessToken: string) {
  const Url =
    "https://simpledemostorageaccount.blob.core.windows.net/?comp=list";
  const Params = {
    method: "GET",
    headers: {
      "x-ms-version": "2017-07-29",
      "x-ms-date": Date.now(),
      Authorization: "Bearer " + accessToken,
    },
  };
  let response = fetch(Url, Params).then((reponsedata) =>
    console.log(reponsedata)
  );

  return response;
}*/
