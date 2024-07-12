const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();


async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");

    // Quick start code goes here
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error("Azure Storage Connection string not found");
    }

    // Create the BlobServiceClient object with connection string
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    //create blob container
    // createBlobContainer(blobServiceClient,"cont2");

    //delete blob container
    // deleteContainerByName(blobServiceClient,"newcont1");

    //list blob containers
    // listBlobContainer(blobServiceClient);

    //add blob content
    const newDate = new Date(Date.now());
    newDate.setTime(newDate.getTime() + 60*60000); //60 min
    const containerClient = blobServiceClient.getContainerClient("blobcontainer");
    const containerSharedURI = await containerClient.generateSasUrl({permissions:"rawl",expiresOn:newDate}); 
    console.log(containerSharedURI);  


    // Define the blob URL using the SAS URL
    const blobUrl = `${containerSharedURI}&comp=block&blockid=blockid1&blobtype=BlockBlob`;

    // Define the file content to be uploaded
    const fileContent = "Hello, Azure Blob Storage!";

    // Use fetch to upload the file to the blob
    const response = await fetch(blobUrl, {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'text/plain'
      },
      body: fileContent
    });

    if (response.ok) {
      console.log('File uploaded successfully!');
    } else {
      console.error('Failed to upload file:', response.status, response.statusText);
    }


    // console.log(
    //   `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
    // );
    // console.log(uploadBlobResponse);


    // const newDate = new Date(Date.now());
    // newDate.setTime(newDate.getTime() + 60*60000); //60 min
    // const sasURL = await blockBlobClient.generateSasUrl({permissions:"read",expiresOn:newDate});

    // console.log(`The sas URL is ${sasURL}`);
    
    

  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

const createBlobContainer = async (blobServiceClient,name) => {
  
  const containerClient = blobServiceClient.getContainerClient(name);

    // Create the container
    const createContainerResponse = await containerClient.create();

    console.log(
      `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
    );
}

const listBlobContainer = async (blobServiceClient) => {
    
  let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }   
}

const deleteContainerByName = async (blobServiceClient,name) => {
  const response = blobServiceClient.deleteContainer(name);
    console.log((await response)._response);

}





main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
