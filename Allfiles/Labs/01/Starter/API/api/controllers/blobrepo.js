const { BlobServiceClient } = require('@azure/storage-blob');

var blobServiceClient;
var containerClient;

module.exports = {

Init: async function () {
    // Create the BlobServiceClient object which will be used to create a container client
    blobServiceClient = await BlobServiceClient.fromConnectionString(process.env.StorageConnectionString);
    // Get a reference to a container
    containerClient = await blobServiceClient.getContainerClient(process.env.container);
},
UploadFile: async function(blobName, file) {
    // Create a blob
    var blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // Upload blob
    await blockBlobClient.upload(file.data, file.size);
    return blockBlobClient.url;
},
LoadList : async function() {
    var data = []; 
    // List existed blobs
    for await (const blob of containerClient.listBlobsFlat()) {
        data.push(`${containerClient.url}/${blob.name}`);
    }
    return data;
}

}
