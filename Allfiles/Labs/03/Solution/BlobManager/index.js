const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceConString = "...";

async function enumerateContainers(client) {
    for await (const container of client.listContainers()) {
        console.log(`Container: ${container.name}`);
    }
}

async function enumerateBlobs(client, ctname) {
    const containerClient = await client.getContainerClient(ctname);

    console.log(`Searching:\t${containerClient.containerName}`)
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`Existing Blob:\t${blob.name}`);
    }
}

async function getContainer(blobServiceClient, ctname) {
    var containerClient = await blobServiceClient.getContainerClient(ctname);
    if (!await containerClient.exists())
    {
       await containerClient.create()
       console.log(`New Container:\t${containerClient.containerName}`);
    }    
    return containerClient;
}

async function getBlob(containerClient, blobName) {
    var blob = await containerClient.getBlockBlobClient(blobName)
    console.log(`Blob Found:\t${blob.name}`);
    return blob;
}

async function main() {

    var blobServiceClient = await BlobServiceClient.fromConnectionString(blobServiceConString);
    var info = await blobServiceClient.getAccountInfo();

    console.log('Connected to Azure Storage Account');
    console.log(`Account name:\t${blobServiceClient.accountName}`);
    console.log(`Account kind:\t${info.accountKind}`);
    console.log(`Account sku:\t${info.skuName}`);

    await enumerateContainers(blobServiceClient);

    var existingContainerName = "raster-graphics";
    await enumerateBlobs(blobServiceClient, existingContainerName);

    var newContainerName = "vector-graphics";
    var containerClient = await getContainer(blobServiceClient, newContainerName);

    var uploadedBlobName = "graph.svg";
    var blobClient = await getBlob(containerClient, uploadedBlobName);

    console.log(`Blob Url:\t${blobClient.url}`);
}

main();