const { BlobServiceClient,generateBlobSASQueryParameters } = require("@azure/storage-blob");
// const fetch = require("node-fetch");
require("dotenv").config();

async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");

    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error("Azure Storage Connection string not found");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    // Generate SAS URL with permissions
    const newDate = new Date(Date.now());
    newDate.setTime(newDate.getTime() + 60 * 60000); // 60 min
    const containerClient = blobServiceClient.getContainerClient("blobcontainer");
    const containerSharedURI = await containerClient.generateSasUrl({
      permissions: "rawl",
      expiresOn: newDate
    });
    console.log("Generated SAS URL:", containerSharedURI);

  } catch (err) {
    console.error("Error: ", err.message);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
