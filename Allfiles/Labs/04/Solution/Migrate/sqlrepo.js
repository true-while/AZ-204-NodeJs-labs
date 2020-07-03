'use strict';
const { Sequelize } = require('sequelize');
const parser = require('mssql-connection-string')
const db = parser(process.env.AdventureWorksSqlContext);

/*
    {
        "host": "database.com",
        "options": {
            "database": "numbers",
            "encrypt": true,
            "port": "1433"
        },
        "password": "qwerty",
        "user": "service"
    }
*/

const sequelize = new Sequelize( db.options.database, db.user, db.password, {
    host: db.host,
    port: db.options.port,  
    dialect: "mssql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Models = sequelize.define('Models', {
    Id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Photo: {
      type: Sequelize.STRING,
      allowNull: false
    }     
  }, {
    tableName: 'Models',
    timestamps: false
  });

function avgProdPrice() {
      if (this.Products!=undefined && this.Products.length >0) {
          var total = 0;
          this.Products.forEach(prod => {
              total += prod.ListPrice
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


const Products = sequelize.define('Products', {
    Id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Model: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ModelId: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: 'Models',
        key: 'Id'
      }
    },
    Color: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Size: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Weight: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    StandardCost: {
      type: "MONEY",
      allowNull: false
    },
    ListPrice: {
      type: "MONEY",
      allowNull: false
    },
    Photo: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Products',
    timestamps: false
  });


module.exports = {
    findModel: async function (modelId) {
        var model = await Models.findOne({ where: { Id: modelId }})
        model.Products = await this.findProducts(model.Id);
        model.modelList = modelList;
        model.avgProdPrice = avgProdPrice;
        return model;
    },
    getModels: async function () {
        var models = await Models.findAll()
        var products = await Products.findAll()
        for(let i=0; i< models.length; i++)
        {
            models[i].Products = products.filter(function(prod) {
                return prod.ModelId == models[i].Id;
              });
            models[i].modelList = modelList;
            models[i].avgProdPrice = avgProdPrice;
        }

        var result = models.sort( function(a, b) {
            return Number(b.avgProdPrice()) - Number(a.avgProdPrice()); 
        });
        return result;
    },    
    findProducts: async function (modelId) {

        var products = await Products.findAll({ where: { ModelId: modelId } })
        return products;
    },
}


