'use strict';
const dotenv = require('dotenv');
const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const sqlrepo = require('./sqlrepo');

const CosmosClient = require('@azure/cosmos').CosmosClient;
const client = new CosmosClient(process.env.CosmosDBConnectionString);

const zeroPad = (num, places) => String(num).padStart(places, '0')

async function main() {
    
    var dbName = 'Retail';
    await client.databases.createIfNotExists({ id: dbName });

    const { container } = await client
        .database( dbName )
        .containers.createIfNotExists(
            { id: 'Online', partitionKey: '/Category' },
            { offerThroughput: 1000 }
        );

    var models =  await sqlrepo.getModels()
    
    console.log(`Total Azure SQL DB Records: ${models.length}`);

    var count=0;
    if (models != null && models.length > 0) {
        for (let i = 0; i < models.length; i++) {

            var model = { 
                id: models[i].Id, 
                Name: models[i].Name, 
                Category: models[i].Category,
                Description: models[i].Description,
                Photo: models[i].Photo,
                Products: models[i].Products }

            var { resource: doc } = await container.items.upsert(model)
            console.log(`Upserted document #${zeroPad(++count,3)} withId: ${doc.id}]`);
        }
    }

    console.log(`Total Azure Cosmos DB Documents: ${count}`);
}

main();
