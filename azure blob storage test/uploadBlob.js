const { BlobServiceClient } = require("@azure/storage-blob");
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

    // Define the blob URL using the SAS URL
    const blobUrl = `${containerSharedURI}&comp=block&blockid=blockid1&blobtype=BlockBlob`;

    // Define the file content to be uploaded
    const fileContent = "Hello, Azure Blob Storage!";

    // Use fetch to upload the file to the blob
    const response = await fetch(blobUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": "text/plain"
      },
      body: fileContent
    });

    if (response.ok) {
      console.log("File uploaded successfully!");
    } else {
      console.error("Failed to upload file:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);
    }
  } catch (err) {
    console.error("Error: ", err.message);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
