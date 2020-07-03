const CosmosClient = require('@azure/cosmos').CosmosClient;
function avgProdPrice() {
    if (this.Products!=undefined && this.Products.length >0) {
        var total = 0;
        this.Products.forEach(prod => {
            total += Number(prod.ListPrice)
        });
        return (total/this.Products.length).toFixed(2)
    }
    return 0;
};
function  modelList() {
    if (this.products!=undefined && this.Products.length >0) {
        var list = [];
        this.Products.forEach(prod => {
            list.push(prod.Name)
        });
        return list;
    }
    return [];
}   

const client = new CosmosClient(process.env.CosmosDBConnectionString);
const database = client.database('Retail');
const container = database.container('Online');

module.exports = {
    findModel: async function (modelId) {
        var querySpec = { 
            query: 'SELECT * from items WHERE items.id = @id',
            parameters: [{ name: "@id", value: modelId }]
        };
        var { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

        if (items != undefined && items.length > 0) {
            var model=items[0]
            model.Id = model.id;
            model.Products = await this.findProducts(model.id);
            model.modelList = modelList;
            model.avgProdPrice = avgProdPrice;
            return model;
        }
        return null;
    },
    getModels: async function () {

        var querySpec = { query: 'SELECT * from models' };

        var { resources: models } = await container.items
                .query(querySpec)
                .fetchAll();

        var products = await this.getProducts();
        
        for(let i=0; i< models.length; i++)
        {
            models[i].Id = models[i].id;
            models[i].Products = products.filter(function(prod) {
                return prod.ModelId == models[i].id;
              });
            models[i].modelList = modelList;
            models[i].avgProdPrice = avgProdPrice;
        }
        return models;
    },    
    findProducts: async function (modelId) {
        var querySpec = { 
            query: 'SELECT VALUE Products FROM Models JOIN Products in Models.Products WHERE Products.ModelId = @mid',
            parameters: [{ name: "@mid", value: modelId }]
        };
        var { resources: products } = await container.items
        .query(querySpec)
        .fetchAll();

        return products;
    },

    getProducts: async function () {
        var querySpec = { 
            query: 'SELECT VALUE Products FROM Models JOIN Products in Models.Products'
        };
        var { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

        return items;
    },
}
