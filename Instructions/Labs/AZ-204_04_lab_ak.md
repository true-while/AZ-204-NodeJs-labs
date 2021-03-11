---
lab:
    title: 'Lab: Constructing a polyglot data solution'
    az204Module: 'Module 04: Develop solutions that use Cosmos DB storage'
---

# Lab: Constructing a polyglot data solution

## Microsoft Azure user interface

Given the dynamic nature of Microsoft cloud tools, you might experience Azure UI changes following the development of this training content. These changes might cause the lab instructions and steps to not match up correctly.

Microsoft updates this training course when the community brings needed changes to our attention. However, because cloud updates occur frequently, you might encounter UI changes before this training content updates. **If this occurs, adapt to the changes, and then work through them in the labs as needed.**

## Instructions

### Before you start

#### Review the installed applications

Find the taskbar on your Windows 10 desktop. The taskbar contains the icons for the applications that you'll use in this lab:
    
-   Microsoft Edge

-   File Explorer

-   Visual Studio Code

### Exercise 1: Creating database resources in Azure

#### Task 1: Open the Azure portal

1.  On the taskbar, select the **Microsoft Edge** icon.

1.  In the open browser window, browse to the Azure portal ([portal.azure.com](https://portal.azure.com)).

1.  Enter the email address for your Microsoft account, and then select **Next**.

1.  Enter the password for your Microsoft account, and then select **Sign in**.

    > **Note**: If this is your first time signing in to the Azure portal, you will be offered a tour of the portal. Select **Get Started** to skip the tour and begin using the portal.

#### Task 2: Create an Azure SQL Database server resource

1.  In the Azure portal's navigation pane, select **All services**.

1.  From the **All services** blade, select **SQL servers**.

1.  From the **SQL servers** blade, find your list of SQL server instances.

1.  From the **SQL servers** blade, select **Add**.

1.  From the **Create SQL Database Server** blade, observe the tabs from the blade, such as **Basics**, **Networking**, and **Additional settings**.

    > **Note**: Each tab represents a step in the workflow to create a new Azure SQL Database server. You can select **Review + Create** at any time to skip the remaining tabs.

    1.  From the **Basics** tab, perform the following actions:
    
    1.  Leave the **Subscription** drop-down list set to its default value.
    
    1.  In the **Resource group** section, select **Create new**, enter **PolyglotData**, and then select **OK**.
    
    1.  In the **Server name** text box, enter **polysqlsrvr[yourname]**.
    
    1.  In the **Location** drop-down list, select **(US) East US**.
    
    1.  In the **Server admin login** text box, enter **testuser**.
    
    1.  In the **Password** text box, enter **TestPa55w.rd**.
    
    1.  In the **Confirm password** text box, enter **TestPa55w.rd** again.

    1.  Select **Next: Networking**.

1.  From the **Networking** tab, perform the following actions:

    1.  In the **Allow Azure services and resources to access this server** section, select **Yes**.
    
    1.  Select **Review + Create**.

1.  From the **Review + Create** tab, review the options that you selected during the previous steps.

1.  Select **Create** to create the SQL Database server by using your specified configuration.

    > **Note**: At this point in the lab, we are only creating the Azure SQL logical server. We will create the Azure SQL database instance later in the lab.

    > **Note**: Wait for the creation task to complete before you move forward with this lab.

#### Task 3: Create an Azure Cosmos DB account resource

1.  In the Azure portal's navigation pane, select **All services**.

1.  From the **All services** blade, select **Azure Cosmos DB**.

1.  From the **Azure Cosmos DB** blade, find your list of Azure Cosmos DB instances.

1.  From the **Azure Cosmos DB** blade, select **Add**.

1.  From the **Create Azure Cosmos DB Account** blade, observe the tabs from the blade, such as **Basics**, **Network**, and **Tags**.

    > **Note**: Each tab represents a step in the workflow to create a new Azure Cosmos DB account. You can select **Review + Create** at any time to skip the remaining tabs.

1.  From the **Basics** tab, perform the following actions:
    
    1.  Leave the **Subscription** list set to its default value.
    
    1.  In the **Resource group** section, select **PolyglotData** from the list.
    
    1.  In the **AccountName** text box, enter **polycosmos[yourname]**.
    
    1.  In the **API** drop-down list, select **Core (SQL)**.

    1.  In the **Notebooks (Preview)** section, select **Off**.

    1.  In the **Apply Free Tier Discount** section, select **Do Not Apply**.
    
    1.  In the **Location** drop-down list, select the **(US) East US** region.
    
    1.  In the **Account Type** section, select **Non-Production**.
    
    1.  In the **Multi-region Writes** section, select **Disable**.
    
    1.  Select **Review + Create**.

1.  From the **Review + Create** tab, review the options that you selected during the previous steps.

1.  Select **Create** to create the Azure Cosmos DB account by using your specified configuration.

    > **Note**: Wait for the creation task to complete before you move forward with this lab.

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  From the **Resource groups** blade, find and then select the **PolyglotData** resource group that you created earlier in this lab.

1.  From the **PolyglotData** blade, select the **polycosmos[yourname]** Azure Cosmos DB account that you created earlier in this lab.

1.  From the **Azure Cosmos DB account** blade, find the **Settings** section from the blade, and then select the **Keys** link.

1.  In the Keys pane, record the value in the **PRIMARY CONNECTION STRING** text box. You'll use this value later in this lab.

#### Task 4: Create an Azure Storage account resource

1.  In the Azure portal's navigation pane, select **All services**.

1.  From the **All services** blade, select **Storage Accounts**.

1.  From the **Storage accounts** blade, find your list of Storage instances.

1.  From the **Storage accounts** blade, select **Add**.

1.  From the **Create storage account** blade, observe the tabs from the blade, such as **Basics**, **Advanced**, and **Tags**.

    > **Note**: Each tab represents a step in the workflow to create a new Azure Storage account. You can select **Review + Create** at any time to skip the remaining tabs.

1.  From the **Basics** tab, perform the following actions:
    
    1.  Leave the **Subscription** list set to its default value.
    
    1.  In the **Resource group** section, select **PolyglotData** from the list.
    
    1.  In the **Storage account name** text box, enter **polystor[yourname]**.
    
    1.  In the **Location** drop-down list, select the **(US) East US** region.
    
    1.  In the **Performance** section, select **Standard**.
    
    1.  In the **Account kind** drop-down list, select **StorageV2 (general purpose v2)**.
    
    1.  In the **Replication** drop-down list, select **Locally-redundant storage (LRS)**.
        
    1.  Select **Review + Create**.

1.  From the **Review + Create** tab, review the options that you selected during the previous steps.

1.  Select **Create** to create the storage account by using your specified configuration.

    > **Note**: Wait for the creation task to complete before you move forward with this lab.

#### Review

In this exercise, you created all the Azure resources that you'll need for a polyglot data solution.

### Exercise 2: Import and validate data

#### Task 1: Upload image blobs

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  From the **Resource groups** blade, find and select the **PolyglotData** resource group that you created earlier in this lab.

1.  From the **PolyglotData** blade, select the **polystor[yourname]** storage account that you created earlier in this lab.

1.  From the **Storage account** blade, select the **Containers** link in the **Blob service** section from the blade.

1.  In the **Containers** section, select **+ Container**.

1.  In the **New container** following actions:
    
    1.  In the **Name** text box, enter **images**.
    
    1.  In the **Public access level** drop-down list, select **Blob (anonymous read access for blobs only)**.
    
    1.  Select **OK**.

1.  Back in the **Containers** section, select the newly created **images** container.

1.  From the **Container** blade, find the **Settings** section from the blade, and then select the **Properties** link.

1.  In the Properties pane, record the value in the **URL** text box. You'll use this value later in this lab.

1.  Find and select the **Overview** link from the blade.

1.  From the blade, select **Upload**.

1.  In the **Upload blob** pop-up, perform the following actions:
    
    1.  In the **Files** section, select the **Folder** icon.
    
    1.  In the **File Explorer** window, browse to **\\Allfiles\\Labs\\04\\Starter\\Images**, select all 42 individual **.jpg** image files, and then select **Open**.
    
    1.  Ensure that **Overwrite if files already exist** is selected, and then select **Upload**.

    > **Note**: Wait for all the blobs to upload before you continue with this lab.

#### Task 2: Upload an SQL .bacpac file

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  From the **Resource groups** blade, find and select the **PolyglotData** resource group that you created earlier in this lab.

1.  From the **PolyglotData** blade, select the **polystor[yourname]** storage account that you created earlier in this lab.

1.  From the **Storage account** blade, select the **Containers** link in the **Blob service** section from the blade.

1.  In the **Containers** section, select **+ Container**.

1.  In the **New container** pop-up, perform the following actions:
    
    1.  In the **Name** text box, enter **databases**.
    
    1.  In the **Public access level** drop-down list, select **Private (no anonymous access)**.
    
    1.  Select **OK**.

1.  Back in the **Containers** section, select the newly created **databases** container.

1.  From the **Container** blade, select **Upload**.

1.  In the **Upload blob** pop-up, perform the following actions:
    
    1.  In the **Files** section, select the **Folder** icon.
    
    1.  In the **File Explorer** window, browse to **\\Allfiles\\Labs\\04\\Starter**, select the **AdventureWorks.bacpac** file, and then select **Open**.
    
    1.  Ensure that **Overwrite if files already exist** is selected, and then select **Upload**.

    > **Note**: Wait for the blob to upload before you continue with this lab.

#### Task 3: Import an SQL database

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  From the **Resource groups** blade, find and select the **PolyglotData** resource group that you created earlier in this lab.

1.  From the **PolyglotData** blade, select the **polysqlsrvr[yourname]** SQL server that you created earlier in this lab.

1.  From the **SQL server** blade, select **Import database**.

1.  From the **Import database** blade, perform the following actions:

    1.  Leave the **Subscription** list set to its default value.

    1.  Select the **Storage** option.

    1.  From the **Storage accounts** blade, select the **polystor[yourname]** storage account that you created earlier in this lab. 

    1.  From the **Containers** blade, select the **databases** container that you created earlier in this lab. 

    1.  From the **Container** blade, select the **AdventureWorks.bacpac** blob that you created earlier in this lab, and then select **Select** to close the blade.

    1.  Back from the **Import database** blade, leave the **Pricing tier** option set to its default value.

    1.  In the **Database name** text box, enter **AdventureWorks**.

    1.  Leave the **Collation** text box set to its default value.

    1.  In the **Server admin login** text box, enter **testuser**.
    
    1.  In the **Password** text box, enter **TestPa55w.rd**.
    
    1.  Select **OK**.

    > **Note**: Wait for the database to be created before you continue with this lab. If you receive a firewall-related error on the import step, it means you did not correctly configure the **Allow Azure services to access server** setting on your SQL Server earlier in the lab.  Review your settings, delete the empty **AdventureWorks** database, and then attempt your import again.
    
#### Task 4: Use an imported SQL database

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  From the **Resource groups** blade, find and select the **PolyglotData** resource group that you created earlier in this lab.

1.  From the **PolyglotData** blade, select the **polysqlsrvr[yourname]** SQL server that you created earlier in this lab.

1.  From the **SQL server** blade, find the **Security** section from the blade, and then select the **Firewalls and virtual networks** link.

1.  In the Firewalls and virtual networks pane, perform the following actions:

    1.  Select **Add client IP**
    
    1.  Select **Save**.

    1.  In the **Success!** confirmation dialog, select **OK**.

    > **Note**: This step will ensure that your local machine will have access to the databases that are associated with this server.

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  From the **Resource groups** blade, find and select the **PolyglotData** resource group that you created earlier in this lab.

1.  From the **PolyglotData** blade, select the **AdventureWorks** SQL database that you created earlier in this lab.

1.  From the **SQL database** blade, find the **Settings** section from the blade, and then select the **Connection strings** link.

1.  In the Connection strings pane, record the value in the **ADO.NET (SQL Authentication)** text box. You'll use this value later in this lab.

1.  Update the connection string that you recorded by performing the following actions:

    1.  Within the connection string, find the *your_username* placeholder and replace it with **testuser**.

    1.  Within the connection string, find the *your_password* placeholder and replace it with **TestPa55w.rd**.

        > **Note**: For example, if your connection string was originally ``Server=tcp:polysqlsrvrinstructor.database.windows.net,1433;Initial Catalog=AdventureWorks;User ID={your_username};Password={your_password};``, your updated connection string will be ``Server=tcp:polysqlsrvrinstructor.database.windows.net,1433;Initial Catalog=AdventureWorks;User ID=testuser;Password=TestPa55w.rd;``

1.  Find and select the **Query editor (preview)** link from the blade.

1.  In the Query editor pane, perform the following actions:

    1.  In the **Login** text box, enter **testuser**.

    1.  In the **Password** text box, enter **TestPa55w.rd**.

    1.  Select **OK**.

1.  In the open query editor, enter the following query:

    ```SQL
    SELECT * FROM AdventureWorks.dbo.Models
    ```

1.  Select **Run** to run the query, and then observe the results.

    > **Note**: This query will return a list of models from the home page of the web application.

1.  In the query editor, replace the existing query with the following query:

    ```SQL
    SELECT * FROM AdventureWorks.dbo.Products
    ```

1.  Select **Run** to run the query, and then observe the results.

    > **Note**: This query will return a list of products that are associated with each model.

#### Review

In this exercise, you imported all the resources that you'll use with your web application.

### Exercise 3: Open and configure a web application

#### Task 1: Open and build the web application

1.  On the **Start** screen, select the **Visual Studio Code** tile.

1.  From the **File** menu, select **Open Folder**.

1.  In the **File Explorer** window that opens, browse to **\\Allfiles\\Labs\\04\\Starter\\AdventureWorks**, and then select **Select Folder**.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to build the web application:

    ```
    npm install
    ```
    
1.  Observe the results of the build printed in the terminal. The build should complete successfully with no errors or warning messages.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: Update the SQL connection string

1.  In the Explorer pane of the **Visual Studio Code** window, expand the **AdventureWorks.Web** project.

1.  Open the **.env** file.

1.  Located connection string started from **AdventureWorksSqlContext**:

1.  Update the value of the **AdventureWorksSqlContext** property by setting its value to the **ADO.NET (SQL Authentication) connection string** of the SQL database that you recorded earlier in this lab.

    ```ini
    AdventureWorksSqlContext=<your connection string>
    ```

    > **Note**: It's important that you use your updated connection string here. The original connection string copied from the portal won't have the username and password necessary to connect to the SQL database.

1.  Save the **.env** file.

#### Task 3: Update the blob base URL

1.  In the the **.env** file locate **BlobContainerUrl** string. 

1.  Update the value of the **BlobContainerUrl** property by setting its value to the **URL** property of the Azure Storage blob container named **images** that you recorded earlier in this lab.

    ```ini
    BlobContainerUrl=
    ```
1.  Save the **.env** file.

#### Task 4: Validate the web application

1.  In the **Visual Studio Code** window, access the shortcut menu or right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to switch your terminal context to the **AdventureWorks** folder. At the command prompt, enter the following command, and then select Enter to run the web application:

    ```
    npm start
    ```

    > **Note**: The **npm start** command will automatically start the web application without a debugger attached. The command will output the port of the running application.

   > **Note**: If there are any build errors, review the project file in the **\\Allfiles\\Labs\\04\\Solution\\AdventureWorks-sql** folder.

1.  On the taskbar, select the **Microsoft Edge** icon.

1.  In the open browser window, browse to the currently running web application (<http://localhost:5000>).

1.  In the web application, observe the list of models displayed from the front page.

1.  Find the **Water Bottle** model, and then select **View Details**.

1.  From the **Water Bottle** product detail page, find **Add to Cart**, and then observe that the checkout functionality is currently disabled.

1.  Close the browser window displaying your web application.

1.  Return to the **Visual Studio Code** window, and then select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

   > **Note**: If there are any build errors, review the project file in the **\\Allfiles\\Labs\\04\\Solution\\AdventureWorks-Cosmos** folder.
   
#### Review

In this exercise, you configured your web application to connect to your resources in Azure.

### Exercise 4: Migrating SQL data to Azure Cosmos DB

#### Task 1: Create a migration project

1.  In the **Visual Studio Code** window, access the shortcut menu or right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to create a new folder named **Migrate** in a folder with the same name:

    ```cmd
    npm init -y
    ```

    > **Note**: The **npm init** command will create a new **package.json** file in a folder with the default parameters.

1.  Create new file named **index.js**:

1.  Add to the project file **sqlrepo.js** from web application you build previously. previously. 

1.  At the command prompt, enter the following commands to load packages from NPM:

    ```cmd
    npm install tedious
    npm install sequelize    
    npm install mssql-connection-string
    npm install dotenv
    ```
   
1.  At the command prompt, enter the following command, and then select Enter to import package of **@azure/cosmos** from NPM:

    ```
    npm install @azure/cosmos
    ```

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: Create a classes 

1.  In the Explorer pane of the **Visual Studio Code** window, expand the **Migrate** project.

1.  Open the **index.js** file.

1.  Add the following lines of code to read environment variables from config file:

    ```javascript
    'use strict';
    const dotenv = require('dotenv');
    const path = require('path');
    const ENV_FILE = path.join(__dirname, '.env');
    dotenv.config({ path: ENV_FILE });
    ```

1.  Create or copy file **.env** from previous project. Add new line named **CosmosDBConnectionString**

1.  Finlay **.env** file should be updated with values you copied before.

    ```ini
    AdventureWorksSqlContext=<your sql connection string>
    CosmosDBConnectionString=<your cosmos db connecting string>
    ```

1.  Update the **cosmosDBConnectionString** string constant by setting its value to the **PRIMARY CONNECTION STRING** of the Azure Cosmos DB account that you recorded earlier in this lab.

1.  Update the **AdventureWorksSqlContext** string, enter the connection string you use in previous exercise. 


1.  Return to **index.js** file. Enter the following code to create a new asynchronous **main** method:

    ```javascript
    function async main() {
    }

    main();
    ```

1.  Within the **main** method, add the following line of code to the top of the **index.js** to reference the file where you data structure is described:

    ```javascript
    const sqlrepo = require('./sqlrepo');
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, access the shortcut menu or right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run your application. The application should be executed without errors:

    ```
    node .\index.js
    ```

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 3: Get SQL database records by using Entity Framework

1.  Within the **main** method of the **index.js** file, add the following line of code to create a new instance of the **sqlrepo** class, where environment variable **AdventureWorksSqlContext** parsed to get DB connection. You also need to request all Models from DB to migration:

    ```javascript
    var models =  await sqlrepo.getModels()
    ```

1.  Within the **main** method, add the following line of code to print the number of records imported from SQL Database:

    ```javascript
    console.log(`Total Azure SQL DB Records: ${models.length}`);
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, access the shortcut menu or right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run your application. The application should return you message that 119 models are retrieved:

    ```
    node .\index.js
    ```

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 4: Insert items into Azure Cosmos DB

1.  In the **index.js** file add the following lines after the `sqlrepo` file was referenced, but before the method **main** started. Following code will create object client to get connected to the Azure Cosmos DB by use connection string you setup in variables. 

    ```javascript
    const CosmosClient = require('@azure/cosmos').CosmosClient;
    const client = new CosmosClient(process.env.CosmosDBConnectionString);
    ```
1.  Add the following function as next functor to format output variables. 

    ```javascript
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    ```

1.  Within the **main** method, add the following line of code to create a new **database** named **Retail** if it doesn't already exist in the Azure Cosmos DB account. Add the line on top of the method **main**:

    ```javascript
    var dbName = 'Retail';
    await client.databases.createIfNotExists({ id: dbName });
    ```

1.  Within the **main** method, add the following block of code to create a new **container** named **Online** if it doesn't already exist in the Azure Cosmos DB account with a partition key path of **/Category** and a throughput of **1000** Request Units:

    ```javascript
    const { container } = await client
        .database( dbName )
        .containers.createIfNotExists(
            { id: 'Online', partitionKey: '/Category' },
            { offerThroughput: 1000 }
        );
    ```

1.  Within the **main** method, under the line of loading models from SQL db add the following line of code to create a variable named **count**:

    ```javascript
    var count = 0;
    ```

1.  Within the **main** method, add the following block of code to create a **for** loop that iterates over the objects in the **models** collection and check if the models are retrieved from debase:

    ```javascript
    if (models != null && models.length > 0) {
        for (let i = 0; i < models.length; i++) {
            // add processing code for the models[i]
        }
    }
    ```

1.  Within the **for** loop in the **main** method, add the following line of code to **upsert** the object into the Azure Cosmos DB collection and save the result named **doc**:

    ```javascript
            var model = { 
                id: models[i].Id, 
                Name: models[i].Name, 
                Category: models[i].Category,
                Description: models[i].Description,
                Photo: models[i].Photo,
                Products: models[i].Products }

            var { resource: doc } = await container.items.upsert(model)
   
    ```

1.  Within the **for** loop contained in the **main** method, add the following line of code to print the document ID of each upsert operation:

    ```javascript
    console.log(`Upserted document #${zeroPad(++count,3)} withId: ${doc.id}]`);
    ```

1.  Back within the **main** method (outside of the **for** loop), add the following line of code to print the number of documents exported to Azure Cosmos DB:

    ```javascript
    console.log(`Total Azure Cosmos DB Documents: ${count}`);
    ```
1.  Your final version of the method **main** should looks like following:

    ```javascript
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
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\04\\Solution\\Migrate** folder.

1.  Save the **index.js** file.



#### Task 5: Perform a migration

1.  At the open command prompt, enter the following command, and then select Enter to run the application:

    ```
    node .\index.js
    ```

1.  Observe the various data that prints to the screen, including initial SQL record count, individual upsert activity identifiers, and final Azure Cosmos DB document count.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 6: Validate the migration

1.  Return to the **Microsoft Edge** browser window with the Azure portal.

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  From the **Resource groups** blade, find and select the **PolyglotData** resource group that you created earlier in this lab.

1.  From the **PolyglotData** blade, select the **polycosmos[yourname]** Azure Cosmos DB account that you created earlier in this lab.

1.  From the **Azure Cosmos DB account** blade, find and select the **Data Explorer** link from the blade.

1.  In the Data Explorer pane, expand the **Retail** database node.

1.  Expand the **Online** container node, and then select **New SQL Query**.

    > **Note**: The label for this option might be hidden. You can get labels by hovering over the icons in the Data Explorer pane.

1.  From the query tab, enter the following text:

    ```
    SELECT * FROM models
    ```

1.  Select **Execute Query**, and then observe the list of JSON models that the query returns.

1.  Back in the query editor, replace the existing text with the following text:

    ```
    SELECT VALUE COUNT(1) FROM models
    ```

1.  Select **Execute Query**, and then observe the result of the **COUNT** aggregate operation.

1.  Return to the **Visual Studio Code** window.

#### Review

In this exercise, you used NPM module for Azure Cosmos DB to migrate data from SQL Database to Azure Cosmos DB.

### Exercise 5: Accessing Azure Cosmos DB by using Node.js

#### Task 1: Update library with the Cosmos SDK and references

1.  In the **Visual Studio Code** open folder **AdventureWorks**.

1.  In the **Visual Studio Code** window, access the shortcut menu or right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to switch your terminal context to the **AdventureWorks** folder.

1.  At the command prompt, enter the following command, and then select Enter to import **@azure/cosmos** from npm:

    ```
    npm install @azure/cosmos
    ```

1. Open file **.env** and add new line and replace value with your Cosmos DB connection string collected previously:

    ```ini
    CosmosDBConnectionString=<your cosmos db connections string>
    ```

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: Write Node.js code to connect to Azure Cosmos DB

1.  In the Explorer pane of the **Visual Studio Code** window, expand the **AdventureWorks** folder.

1.  Access the shortcut menu or right-click or activate the shortcut menu  and then select **New File** named **cosmosrepo.js**.

1.  From the code editor tab for the **cosmosrepo.js** file, add the following lines of code to import the cosmos db namespace from to the project:

    ```javascript
    const CosmosClient = require('@azure/cosmos').CosmosClient;
    ```

1.  Add the following lines of code to implement models' function you previously build for objects retrieved from sql server:

    ```javascript
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
    ```

1.  Within the **cosmosrepo.js** file, add the following block of code to create a new instance of the **CosmosClient** class and then obtain both a **database** and **container** instance from the client:

    ```javascript
    const client = new CosmosClient(process.env.CosmosDBConnectionString);
    const database = client.database('Retail');
    const container = database.container('Online');
    ```

1.  Within the **cosmosrepo.js** file, add a new **findModel** method with the following signature:

    ```javascript
    module.exports = {
        findModel: async function (modelId) {
        }
    }
    ```

1.  Within the **findModel** method, add the following blocks of code to create a SQL query, transform it into an iterator, iterate over the result set, and then return the single item in the result set:

    ```javascript
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
    ```

1.  Within the **cosmosrepo.js** file, add a new **getModels** method with the following signature inside `module.exports = {...}`:

    ```javascript
    getModels: async function () {
    }
    ```

1.  Within the **getModels** method, add the following blocks of code to run an SQL query, get the query result iterator, iterate over the result set, and then return the union of all results:

    ```javascript
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
    ```

1.  Within the **cosmosrepo.js** file, add a new **findProducts** method with the following signature inside `module.exports = {...}`:

    ```javascript
    findProducts: async function (modelId) {
    }
    ```

1.  Within the **findProducts** method, add the following blocks of code to run an SQL query, get the query and then return the collection of items in the result set:

    ```javascript
        var querySpec = { 
            query: 'SELECT VALUE Products FROM Models JOIN Products in Models.Products WHERE Products.ModelId = @mid',
            parameters: [{ name: "@mid", value: modelId }]
        };
        var { resources: products } = await container.items
        .query(querySpec)
        .fetchAll();

        return products;
    ```

1.  Within the **cosmosrepo.js** file, add a new **getProducts** method with the following signature inside `module.exports = {...}`:

    ```javascript
    getProducts: async function () {
    }
    ``` 

1.  Within the **getProducts** method, add the following blocks of code to run an SQL query, get the query and then return the collection of items in the result set:

    ```javascript
        var querySpec = { 
            query: 'SELECT VALUE Products FROM Models JOIN Products in Models.Products'
        };
        var { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

        return items;
    ```

1.  Save the **cosmosrepo.js** file.

#### Task 3: Update Node.js web application logic

1.  In the Explorer pane of the **Visual Studio Code** window, expand the **AdventureWorks.Web** project.

1.  Open the **routes\details.js** file.

1.  In the top of the file, find the existing line:

    ```javascript
    const sqlrepo = require('../sqlrepo');
    ```

1.  Replace that with following line of code:

    ```javascript
    const sqlrepo = require('../cosmosrepo');
    ```

1.  Repeat the same step with **routes\index.js** file.

#### Task 5: Validate that the Nodejs application successfully connects to Azure Cosmos DB

1.  In the **Visual Studio Code** window, access the shortcut menu or right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to switch your terminal context to the **AdventureWorks** folder.

1.  At the command prompt, enter the following command, and then select Enter to run the web application:

    ```
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the project file in the **\\Allfiles\\Labs\\04\\Solution\\AdventureWorks-Cosmos** folder.

1.  On the taskbar, select the **Microsoft Edge** icon.

1.  In the open browser window, browse to the currently running web application (<http://localhost:5000>).

1.  In the web application, observe the list of models displayed from the front page.

1.  Find the **Touring-1000** model, and then select **View Details**.

1.  From the **Touring-1000** product detail page, perform the following actions:

    1.  In the **Select options** list, select **Touring-1000 Yellow, 50, $2384.07**.
    
    1.  Find **Add to Cart**, and then observe that the checkout functionality is still disabled.

1.  Close the browser window displaying your web application.

1.  Return to the **Visual Studio Code** window, and then select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Review

In this exercise, you wrote C# code to query an Azure Cosmos DB collection by using the SDK.

### Exercise 6: Clean up your subscription 

#### Task 1: Open Azure Cloud Shell

1.  In the Azure portal, select the **Cloud Shell** icon to open a new shell instance.

    > **Note**: The **Cloud Shell** icon is represented by a greater than sign (\>) and underscore character (\_).

1.  If this is your first time opening Cloud Shell using your subscription, you can use the **Welcome to Azure Cloud Shell Wizard** to configure Cloud Shell for first-time usage. Perform the following actions in the wizard:
    
    1.  A dialog box prompts you to create a new storage account to begin using the shell. Accept the default settings, and then select **Create storage**.
    
    > **Note**: Wait for the Cloud Shell to finish its initial setup procedures before moving forward with the lab.If you don't notice the Cloud Shell configuration options, this is most likely because you're using an existing subscription with this course's labs. The labs are written with the presumption that you're using a new subscription.

#### Task 2: Delete resource groups

1.  At the command prompt, enter the following command, and then select Enter to delete the **PolyglotData** resource group:

    ```
    az group delete --name PolyglotData --no-wait --yes
    ```
    
1.  Close the Cloud Shell pane in the portal.

#### Task 3: Close the active applications

1.  Close the currently running Microsoft Edge application.

1.  Close the currently running Visual Studio Code application.

#### Review

In this exercise, you cleaned up your subscription by removing the resource groups used in this lab.
