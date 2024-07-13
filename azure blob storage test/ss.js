const { BlobServiceClient } = require("@azure/storage-blob");

const ss = async () => {
    const sasURL = "https://bsdatalabel.blob.core.windows.net/?sv=2024-05-04&se=2024-07-13T11%3A33%3A51Z&sr=c&sp=rawl&sig=3dUUwLPvE3Ht4BLsWTY8z5xAUFh4oBUstcmObLIAnoA%3D";

    try {
        const blobServiceClient = new BlobServiceClient(sasURL);
        const containerClient = blobServiceClient.getContainerClient("blobcontainer");
        const blockBlobClient = containerClient.getBlockBlobClient("zzz.txt");
        const uploadBlobResponse = await blockBlobClient.uploadFile("./hello.txt");
        console.log(
            `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
          );
    } catch (error) {
        console.log("Err: ",error);
    }




}

ss();