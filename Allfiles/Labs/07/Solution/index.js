const { BlobServiceClient } = require('@azure/storage-blob');
    
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (data) => {
            chunks.push(data.toString());
        });
        readableStream.on('end', () => {
            resolve(chunks.join(''));
        });
        readableStream.on('error', reject);
    });
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var connectionString = process.env['StorageConnectionString'];
    var blobServiceClient = await BlobServiceClient.fromConnectionString(connectionString);
    var containerClient = await blobServiceClient.getContainerClient("drop");
    if (await containerClient.exists()) {
        var blockBlobClient = containerClient.getBlockBlobClient('records.json');
        var downloadBlockBlobResponse = await blockBlobClient.download(0);
        var filecontent = await streamToString(downloadBlockBlobResponse.readableStreamBody);
        context.res = {
            body: filecontent
        };
    }
}