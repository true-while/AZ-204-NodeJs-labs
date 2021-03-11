---
lab:
    title: 'Lab: Retrieving Azure Storage resources and metadata by using the Azure Storage SDK'
    az204Module: 'Module 03: Develop solutions that use blob storage'
---

# Lab: Retrieving Azure Storage resources and metadata by using the Azure Storage SDK

## Microsoft Azure user interface

Given the dynamic nature of Microsoft cloud tools, you might experience Azure UI changes after the development of this training content. These changes might cause the lab instructions and lab steps to not match up.

Microsoft updates this training course when the community brings needed changes to our attention; however, because cloud updates occur frequently, you might encounter UI changes before this training content updates. **If this occurs, adapt to the changes, and then work through them in the labs as needed.**

## Instructions

### Before you start

#### Review the installed applications

Find the taskbar on your Windows 10 desktop. The taskbar contains the icons for the applications that you'll use in this lab:
    
-   Microsoft Edge

-   File Explorer

### Exercise 1: Create Azure resources

#### Task 1: Open the Azure portal

1.  On the taskbar, select the **Microsoft Edge** icon.

1.  In the open browser window, go to the Azure portal (<https://portal.azure.com>).

1.  Enter the email address for your Microsoft account, and then select **Next**.

1.  Enter the password for your Microsoft account, and then select **Sign in**.

    > **Note**: If this is your first time signing in to the Azure portal, you'll be offered a tour of the portal. Select **Get Started** to skip the tour and begin using the portal.

#### Task 2: Create a Storage account

1.  In the Azure portal's navigation pane, select **All services**.

1.  On the **All services** blade, select **Storage Accounts**.

1.  On the **Storage accounts** blade, find your list of Storage instances.

1.  On the **Storage accounts** blade, select **Add**.

1.  Find the tabs on the **Create storage account** blade, such as **Basics**.

    > **Note**: Each tab represents a step in the workflow to create a new storage account. You can select **Review + Create** at any time to skip the remaining tabs.

1.  On the **Basics** tab, perform the following actions:
    
    1.  Leave the **Subscription** text box set to its default value.

    1.  In the **Resource group** section, select **Create new**, enter **StorageMedia**, and then select **OK**.

    1.  In the **Storage account name** text box, enter **mediastor*[yourname]***.

    1.  In the **Location** drop-down list, select the **(US) East US** region.

    1.  In the **Performance** section, select **Standard**.

    1.  In the **Account kind** drop-down list, select **StorageV2 (general purpose v2)**.

    1.  In the **Replication** drop-down list, select **Read-access geo-redundant storage (RA-GRS)**.

    1.  Select **Review + Create**.

1.  On the **Review + Create** tab, review the options that you selected during the previous steps.

1.  Select **Create** to create the storage account by using your specified configuration. 

    > **Note**: Wait for the creation task to complete before you move forward with this lab.

1.  In the Azure portal's navigation pane, select **All services**.

1.  On the **All services** blade, select **Storage Accounts**.

1.  On the **Storage accounts** blade, select the **mediastor*[yourname]*** storage account instance.

1.  On the **Storage account** blade, find the **Settings** section, and then select the **Properties** link.

1.  In the **Properties** section, record the value of the **Primary Blob Service Endpoint** text box.

    > **Note**: You'll use this value later in the lab.

1.  Still on the **Storage account** blade, find the **Settings** section, and then select the **Access keys** link.

1.  In the **Access keys** section, perform the following actions:

    1.  Record the value in the **Storage account name** text box.
    
    1.  Select any one of the keys, and then record the value in either of the **Key** boxes.

    > **Note**: All these values will be used later in this lab.

#### Review

In this exercise, you created a new Storage account to use throughout the remainder of the lab.

### Exercise 2: Upload a blob into a container

#### Task 1: Create storage account containers

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  On the **Resource groups** blade, find and then select the **StorageMedia** resource group that you created earlier in this lab.

1.  On the **StorageMedia** blade, select the **mediastor*[yourname]*** storage account that you created earlier in this lab.

1.  On the **Storage account** blade, select the **Containers** link in the **Blob service** section.

1.  In the **Containers** section, select **+ Container**.

1.  In the **New container** pop-up window, perform the following actions:
    
    1.  In the **Name** text box, enter **raster-graphics**.
    
    1.  In the **Public access level** drop-down list, select **Private (no anonymous access)**, and then select **OK**.

1.  Back in the **Containers** section, select **+ Container**.

1.  In the **New container** pop-up window, perform the following actions:
    
    1.  In the **Name** text box, enter **compressed-audio**.
    
    1.  In the **Public access level** drop-down list, select **Private (no anonymous access)**, and then select **OK**.

1.  Back in the **Containers** section, observe the updated list of containers.

#### Task 2: Upload a storage account blob

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  On the **Resource groups** blade, find and then select the **StorageMedia** resource group that you created earlier in this lab.

1.  On the **StorageMedia** blade, select the **mediastor*[yourname]*** storage account that you created earlier in this lab.

1.  On the **Storage account** blade, select the **Containers** link in the **Blob service** section.

1.  In the **Containers** section, select the recently created **raster-graphics** container.

1.	On the **Container** blade, select **Upload**.

1.	In the **Upload blob** window, perform the following actions:

    1.  In the **Files** section, select the **Folder** icon.

    1.  In the **File Explorer** window, browse to **\\Allfiles\\Labs\\03\\Starter\\Images**, select the **graph.jpg** file, and then select **Open**.

    1.  Ensure that the **Overwrite if files already exist** check box is selected, and then select **Upload**. 
    
    > **Note**: Wait for the blob to upload before you continue with this lab.

#### Review

In this exercise, you created a couple of placeholder containers in the storage account and populated one of the containers with a blob.

### Exercise 3: Access containers by using the .NET SDK

#### Task 1: Create .NET project

1.  On the **Start** screen, select the **Visual Studio Code** tile.

1.  From the **File** menu, select **Open Folder**.

1.  In the **File Explorer** window that opens, browse to **\\Allfiles\\Labs\\03\\Starter\\BlobManager**, and then select **Select Folder**.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to create a new .NET project named **BlobManager** in the current folder:

    ```
    npm init -y
    ```

    > **Note**: The command will create a new `package.json` file in a folder with the same parameters name of projects.

1.  Create new file **index.js**.

1.  Add following line to the file **console.log("hello world!");**

1.  At the command prompt, enter the following commands to install package **@azure/storage-blob** and others from NPM:

    ```
    npm install @azure/storage-blob
    ```

    > **Note**: The **npm install** command will add the **@azure/storage-blob** package from NPM. For more information, go to [@azure/storage-blob](https://www.npmjs.com/package/@azure/storage-blob).

1.  At the command prompt, enter the following command, and then select Enter to build the application. You should see the hello message:

    ```
    node .\index.js
    ```

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: Modify the Program class to access Storage

1.  In the Explorer pane of the **Visual Studio Code** window, open the **index.js** file.

1.  On the code editor tab for the **index.js** file, delete all the code in the existing file.

1.  Add the following line of code to import the **azure/storage-blob** package:

    ```JavaScript

    const { BlobServiceClient } = require('@azure/storage-blob');
    ```
    

1.  Enter the following code to create a new **index.js** file:

    ```JavaScript
    async function main()
    {
    }

    main();
    ``` 

1.  In the **index.js** file, enter the following line of code to create a new string constant named **blobServiceConString**:

    ```JavaScript
    const blobServiceConString = "...";
    ```


1.  Update the **blobServiceConString** string constant by setting its value to the **Connection string** of the Storage account that you recorded earlier in this lab.

1.  In the **index.js** file, enter the following code to create a server asynchronous under method **main** method:

    ```Javascript
    async function enumerateContainers(client) {

    }

    async function enumerateBlobs(client, ctname) {

    }

    async function getContainer(blobServiceClient, ctname) {

    }

    async function getBlob(containerClient, blobName) {

    }
    ```


#### Task 3: Connect to the Azure Storage blob service endpoint

1.  In the **main** method, add the following line of code to create a new instance of the **BlobServiceClient** class by using the **blobServiceConString**  constants as constructor parameters:

    ```Javascript
    var blobServiceClient = await BlobServiceClient.fromConnectionString(blobServiceConString);
    ```

1.  In the **main** method, add the following line of code to invoke the **getAccountInfo** method of the **BlobServiceClient** class to retrieve account metadata from the service:

    ```Javascript
    var info = await blobServiceClient.getAccountInfo();
    ```
    
1.  In the **main** method, add the following line of code to render a welcome message:

    ```Javascript
    console.log('Connected to Azure Storage Account');
    ```
    
1.  In the **main** method, add the following line of code to render the storage account's name:

    ```Javascript
    console.log(`Account name:\t${blobServiceClient.accountName}`);
    ```
    
1.  In the **main** method, add the following line of code to render the type of storage account:

    ```Javascript
    console.log(`Account kind:\t${info.accountKind}`);
    ```
    
1.  In the **main** method, add the following line of code to render the currently selected stock keeping unit (SKU) for the storage account:

    ```Javascript
    console.log(`Account sku:\t${info.skuName}`);
    ```

1.  Observe the **main** method, which should now include:

    ```Javascript
    async function main() {

        var blobServiceClient = await BlobServiceClient.fromConnectionString(blobServiceConString);
        var info = await blobServiceClient.getAccountInfo();

        console.log('Connected to Azure Storage Account');
        console.log(`Account name:\t${blobServiceClient.accountName}`);
        console.log(`Account kind:\t${info.accountKind}`);
        console.log(`Account sku:\t${info.skuName}`);
    }
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the .NET web application:

    ```cmd
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\03\\Solution\\BlobManager** folder.

1.  Observe the output from the currently running console application. The output contains metadata for the Storage account that was retrieved from the service.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 4: Enumerate the existing containers

1.  In the **index.js** file, find the method named **enumerateContainers** that's asynchronous and has a single **BlobServiceClient** parameter type:

    ```javascript
    async function enumerateContainers(client) {

    }
    ```

1.  In the **enumerateContainers** method, enter the following code to create an asynchronous **for** loop that iterates over the results of an invocation of the **listContainers** method of the **BlobServiceClient** class:

    ```javascript
    for await (const container of client.listContainers()) {
        
    }
    ```

1.  Within the **for** loop, enter the following code to print the name of each container:

    ```javascript
    console.log(`Container: ${container.name}`);
    ```

1.  Observe the **enumerateContainers** method, which should now include:

    ```javascript
    async function enumerateContainers(client) {
        for await (const container of client.listContainers()) {
            console.log(`Container: ${container.name}`);
        }
    }
    ```

1.  In the **main** method, enter the following code at the end of the method to invoke the **EnumerateContainersAsync** method, passing in the *serviceClient* variable as a parameter:

    ```javascript
    await enumerateContainers(blobServiceClient);
    ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {
        // Existing code removed for brevity
        
        await enumerateContainers(serviceClient);
    }
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or access the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the .NET web application:

    ```cmd
    dotnet run
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\03\\Solution\\BlobManager** folder.

1.  Observe the output from the currently running console application. The updated output includes a list of every existing container in the account.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Review

In this exercise, you accessed existing containers by using the Azure Storage SDK. 

### Exercise 4: Retrieve blob Uniform Resource Identifiers (URIs) by using the .NET SDK

#### Task 1: Enumerate the blobs in an existing container by using the SDK

1.  In the **index.js** file, find  method named **enumerateBlobs** that's asynchronous and has two parameter types, **BlobServiceClient** and **string**:

    ```javascript
    async function enumerateBlobs(client, ctname) {
    {      
    }
    ```

1.  In the **enumerateBlobs** method, enter the following code to get a new instance of the **BlobContainerClient** class by using the **getContainerClient** method of the **BlobServiceClient** class, passing in the **ctname** parameter:

    ```javascript
    const containerClient = await client.getContainerClient(ctname);
    ```

1.  In the **enumerateBlobs** method, enter the following code to render the name of the container that will be enumerated:

    ```javascript
    console.log(`Searching:\t${containerClient.containerName}`)
    ```

1.  In the **enumerateBlobs** method, enter the following code to create an asynchronous **for** loop that iterates over the results of an invocation of the **listBlobsFlat** method of the **BlobContainerClient** class:

    ```javascript
    for await (const blob of containerClient.listBlobsFlat()) {
    }
    ```

1.  Within the **for** loop, enter the following code to print the name of each blob:

    ```javascript
    console.log(`Existing Blob:\t${blob.name}`);
    ```

1.  Observe the **enumerateBlobs** method, which should now include:

    ```javascript
    async function enumerateBlobs(client, ctname) {
        const containerClient = await client.getContainerClient(ctname);
        console.log(`Searching:\t${containerClient.containerName}`)
        for await (const blob of containerClient.listBlobsFlat()) {
            console.log(`Existing Blob:\t${blob.name}`);
        }
    }
    ```

1.  In the **main** method, enter the following code at the end of the method to create a variable named *existingContainerName* with a value of **raster-graphics**:

    ```javascript
    var existingContainerName = "raster-graphics";
    ```

1.  In the **main** method, enter the following code at the end of the method to invoke the **enumerateBlobs** method, passing in the *blobServiceClient* and *existingContainerName* variables as parameters:

    ```javascript
    await enumerateBlobs(blobServiceClient, existingContainerName);
    ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {

        // Existing code removed for brevity

        await enumerateContainers(blobServiceClient);

        var existingContainerName = "raster-graphics";
        await enumerateBlobs(blobServiceClient, existingContainerName);
    }
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the .NET web application:

    ```cmd
    dotnet run
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\03\\Solution\\BlobManager** folder.

1.  Observe the output from the currently running console application. The updated output includes metadata about the existing container and blobs.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: Create a new container by using the SDK

1.  In the **index.js** file, find method named **getContainer** that's asynchronous and has two parameter types, **BlobServiceClient** and **string**:

    ```javascript
    async function getContainer(blobServiceClient, ctname) {
    }
    ```

1.  In the **getContainer** method, enter the following code to get a new instance of the **BlobContainerClient** class by using the **getContainerClient** method of the **BlobServiceClient** class, passing in the **ctname** parameter:

    ```
   var containerClient = await blobServiceClient.getContainerClient(ctname);
    ```

1.  In the **getContainer** method, enter the following code to invoke the **exists** method of the **BlobContainerClient** class to find out if the container already created and create if it is not created by use method create of **BlobContainerClient** class:

    ```javascript
    if (!await containerClient.exists())
    {
       await containerClient.create()
       console.log(`New Container:\t${containerClient.containerName}`);
    }  
    ```

1.  In the **getContainer** method, enter the following code to render the name of the container that was potentially created:

    ```javascript
    console.log(`New Container:\t${containerClient.containerName}`);
    ```

1.  In the **getContainer** method, enter the following code to return the instance of the **BlobContainerClient** class named **containerClient** as the result of the **getContainer** method:

    ```
    return containerClient;
    ```  

1.  Observe the **getContainer** method, which should now include:

    ```javascript
    async function getContainer(blobServiceClient, ctname) {
        var containerClient = await blobServiceClient.getContainerClient(ctname);
        if (!await containerClient.exists())
        {
            await containerClient.create()
            console.log(`New Container:\t${containerClient.containerName}`);
        }    
        return containerClient;
    }
    ```

1.  In the **main** method, enter the following code at the end of the method to create a variable named *newContainerName* with a value of **vector-graphics**:

    ```javascript
    var newContainerName = "vector-graphics";
    ```

1.  In the **main** method, enter the following code at the end of the method to invoke the **getContainer** method, passing in the *blobServiceClient* and *newContainerName* variables as parameters, and to store the result in a variable named *containerClient* of type **BlobContainerClient**:

    ```javascript
    var containerClient = await getContainer(blobServiceClient, newContainerName);
    ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {

            // Existing code removed for brevity

            await enumerateContainers(blobServiceClient);

            var existingContainerName = "raster-graphics";
            await enumerateBlobs(blobServiceClient, existingContainerName);

            var newContainerName = "vector-graphics";
            var containerClient = await getContainer(blobServiceClient, newContainerName);
    }
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the .NET web application:

    ```cmd
    dotnet run
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\03\\Solution\\BlobManager** folder.

1.  Observe the output from the currently running console application. The updated output includes metadata about the existing container and blobs.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 3: Upload a new blob by using the portal

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  On the **Resource groups** blade, find and then select the **StorageMedia** resource group that you created earlier in this lab.

1.  On the **StorageMedia** blade, select the **mediastor*[yourname]*** storage account that you created earlier in this lab.

1.  On the **Storage account** blade, select the **Containers** link in the **Blob service** section.

1.  In the **Containers** section, select the newly created **vector-graphics** container.

1.	On the **Container** blade, select **Upload**.

1.	In the **Upload blob** window, perform the following actions:

    1.  In the **Files** section, select the **Folder** icon.

    1.  In the **File Explorer** window, browse to **\\Allfiles\\Labs\\03\\Starter\\Images**, select the **graph.svg** file, and then select **Open**.

    1.  Ensure that the **Overwrite if files already exist** check box is selected, and then select **Upload**. 
    
    > **Note**: Wait for the blob to upload before you continue with this lab.

#### Task 4: Access blob URI by using the SDK

1.  In the **Program** class, locate method named **getBlob** that's asynchronous and has two parameter types, **BlobContainerClient** and **string**:

    ```javascript
    async function getBlob(containerClient, blobName) {
    }
    ```

1.  In the **getBlob** method, enter the following code to get a new instance of the **BlobClient** class by using the **GetBlobClient** method of the **BlobContainerClient** class, passing in the **blobName** parameter:

    ```javascript
    var blob = await containerClient.getBlockBlobClient(blobName)
    ```

1.  In the **getBlob** method, enter the following code to render the name of the blob that was referenced:

    ```javascript
    console.log(`Blob Found:\t${blob.name}`);
    ```

1.  In the **getBlob** method, enter the following code to return the instance of the **BlobClient** class named **blob** as the result of the **getBlob** method:

    ```javascript
    return blob;
    ```

1.  Observe the **getBlob** method, which should now include:

    ```javascript
    async function getBlob(containerClient, blobName) {
        var blob = await containerClient.getBlockBlobClient(blobName)
        console.log(`Blob Found:\t${blob.name}`);
        return blob;
    }
    ```

1.  In the **main** method, enter the following code at the end of the method to create a variable named *uploadedBlobName* with a value of **graph.svg**:

    ```javascript
    var uploadedBlobName = "graph.svg";
    ```

1.  In the **main** method, enter the following code at the end of the method to invoke the **GetBlobAsync** method, passing in the *containerClient* and *uploadedBlobName* variables as parameters, and to store the result in a variable named *blobClient* of type **BlobClient**:

    ```javascript
     var blobClient = await getBlob(containerClient, uploadedBlobName);
    ```

1.  In the **main** method, enter the following code at the end of the method to render the **Uri** property of the *blobClient* variable:

    ```javascript
    console.log(`Blob Url:\t${blobClient.url}`);
    ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {
        // Existing code removed for brevity
        
        await enumerateContainers(blobServiceClient);

        var existingContainerName = "raster-graphics";
        await enumerateBlobs(blobServiceClient, existingContainerName);

        var newContainerName = "vector-graphics";
        var containerClient = await getContainer(blobServiceClient, newContainerName);

        var uploadedBlobName = "graph.svg";
        var blobClient = await getBlob(containerClient, uploadedBlobName);

        console.log(`Blob Url:\t${blobClient.url}`);
    }
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the .NET web application:

    ```cmd
    dotnet run
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\03\\Solution\\BlobManager** folder.

1.  Observe the output from the currently running console application. The updated output includes the final URL to access the blob online. Record the value of this URL to use later in the lab.

    > **Note**: The URL will likely be similar to the following string: **https://mediastor*[yourname]*.blob.core.windows.net/vector-graphics/graph.svg**

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 5: Test the URI by using a browser

1.  On the taskbar, right-click the **Microsoft Edge** icon or activate the shortcut menu, and then select **New window**.

1.  In the new browser window, go to the URL that you copied for the blob earlier in this lab.

1.  You should now notice the Scalable Vector Graphic (SVG) file in your browser window.

#### Review

In this exercise, you created containers and managed blobs by using the Storage SDK. 

### Exercise 5: Clean up your subscription 

#### Task 1: Open Azure Cloud Shell and list resource groups

1.  In the Azure portal's navigation pane, select the **Cloud Shell** icon to open a new shell instance.

    > **Note**: The **Cloud Shell** icon is represented by a greater than sign (\>) and underscore character (\_).

1.  If this is your first time opening Cloud Shell using your subscription, you can use the **Welcome to Azure Cloud Shell Wizard** to configure Cloud Shell for first-time usage. Perform the following actions in the wizard:
    
    1.  A dialog box prompts you to create a new storage account to begin using the shell. Accept the default settings, and then select **Create storage**. 

    > **Note**: Wait for Cloud Shell to finish its initial setup procedures before moving forward with the lab. If you don't notice Cloud Shell configuration options, this is most likely because you're using an existing subscription with this course's labs. The labs are written with the presumption that you're using a new subscription.

#### Task 2: Delete a resource group

1.  At the command prompt, enter the following command, and then select Enter to delete the **StorageMedia** resource group:

    ```cmd
    az group delete --name StorageMedia --no-wait --yes
    ```
    
1.  Close the Cloud Shell pane in the portal.

#### Task 3: Close the active application

1.     the currently running Microsoft Edge application.

#### Review

In this exercise, you cleaned up your subscription by removing the resource group used in this lab.
