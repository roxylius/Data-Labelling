const {
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
  BlobSASPermissions
} = require("@azure/storage-blob");
// const fetch = require("node-fetch");
require("dotenv").config();

const genSasToken = () => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME,
    process.env.AZURE_STORAGE_ACCOUNT_KEY
  );
  const permissions = BlobSASPermissions.parse("racwd");
  const startDate = new Date();
  const expiryDate = new Date(startDate);
  expiryDate.setMinutes(startDate.getMinutes() + 100);
  startDate.setMinutes(startDate.getMinutes() - 100);
  const queryParams = generateBlobSASQueryParameters(
    {
      containerName: "blobcontainer",
      permissions: permissions.toString(),
      startsOn: startDate,
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  );

  console.log(queryParams.toString());
};

genSasToken();
