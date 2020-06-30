# Azure Storage JS Explorer

This project intends to display an Azure Storage Explorer as a static website in one Azure Storage Account

## Context

Per the Microsoft documentation, Azure AD Authentication should be your privileged way to access storage account blob.
However, this leads you to use one of the following tool : Azure Portal, Azure Storage Explorer or some code.

Because blob is the cheapest way to store some content on Azure, it is now not only used by application but directly by user.
While IT admin can easily use Azure Portal or Azure storage Explorer, it may not be suitable for end user.

The following solution intends to be :

- close to free : there is no back end servers and the website is host on the storage account itself
- easy to use for end user -no installation steps for them- just an url.

Please note this solution provides read-only access only for now.

## Installation steps

1. Activate static website on your storage account and copy your enpoint url
2. Create an app registration on your tenant :
   - as an redirectUri provide the static website endpoint from step 1
   - Provide the following scope : Microsoft Graph/User.Read + Azure Storage/user_impersonation
3. Edit Config.js to fill in your appID, authorityurl, redirectUri, and the storage account you want to list
4. npm run build
5. Deploy the build to the static website (there is a Visual Code extension to do that for you)
