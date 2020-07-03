---
lab:
    title: 'Lab: Asynchronously processing messages by using Azure Storage Queues'
    az204Module: 'Module 11: Develop message-based solutions'
---

# Lab: Asynchronously processing messages by using Azure Storage Queues

## Microsoft Azure user interface

Given the dynamic nature of Microsoft cloud tools, you might experience Azure UI changes after the development of this training content. These changes might cause the lab instructions and lab steps to not match up.

Microsoft updates this training course when the community brings needed changes to our attention; however, because cloud updates occur frequently, you might encounter UI changes before this training content updates. **If this occurs, adapt to the changes, and then work through them in the labs as needed.**

## Instructions

### Before you start

#### Review the installed applications

Find the taskbar on your Windows 10 desktop. The taskbar contains the icons for the applications that you'll use in this lab:
    
-   Microsoft Edge

-   Visual Studio Code

-   Azure Storage Explorer

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

1.  On the **Storage accounts** blade, get your list of storage account instances.

1.  On the **Storage accounts** blade, select **Add**.

1.  On the **Create storage account** blade, observe the tabs on the blade, such as **Basics**, **Tags**, and **Review + Create**.

    > **Note**: Each tab represents a step in the workflow to create a new storage account. You can select **Review + Create** at any time to skip the remaining tabs.

1.  Select the **Basics** tab, and then in the tab area, perform the following actions:
    
    1.  Leave the **Subscription** text box set to its default value.
    
    1.  In the **Resource group** section, select **Create new**, enter **AsyncProcessor**, and then select **OK**.
    
    1.  In the **Storage account name** text box, enter **asyncstor[yourname]**.
    
    1.  In the **Location** list, select the **(US) East US** region.
    
    1.  In the **Performance** section, select **Standard**.
    
    1.  In the **Account kind** list, select **StorageV2 (general purpose v2)**.
    
    1.  In the **Replication** list, select **Locally-redundant storage (LRS)**.
    
    1.  In the **Access tier (default)** section, ensure that **Hot** is selected.
    
    1.  Select **Review + Create**.

1.  On the **Review + Create** tab, review the options that you specified in the previous steps.

1.  Select **Create** to create the storage account by using your specified configuration.

    > **Note**: On the **Deployment** blade, wait for the creation task to complete before moving forward with this lab.

1.	Select the **Go to resource** button on the **Deployment** blade to go to the newly created storage account.

1.	On the **Storage account** blade, find the **Settings** section, and then select **Access keys**.

1.	On the **Access keys** blade, select any one of the keys, and then record the value of either of the **Connection string** boxes. You'll use this value later in this lab.

    > **Note**: It doesn't matter which connection string you choose. They are interchangeable.

#### Review

In this exercise, you created a new Azure Storage account that you'll use through the remainder of the lab.

### Exercise 2: Configure the Azure Storage SDK in project 

#### Task 1: Create new project

1.  On the **Start** screen, select the **Visual Studio Code** tile.

1.  On the **File** menu, select **Open Folder**.

1.  In the **File Explorer** window that opens, browse to **\\Allfiles\\Labs\\11\\Starter\\MessageProcessor**, and then select **Select Folder**.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to create a new project named **MessageProcessor** in the current folder:

    ```cmd
    npm init -y
    ```

    > **Note**: The command will create a new **package.proj** file in a folder with the details name as the project.

1.  At the command prompt, enter the following command, and then select Enter to import version  of **azure-storage** from npm:

    ```cmd
    npm install azure-storage
    ```
1.  Create new file **index.js**.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: Write code to access Azure Storage

1.  In the Explorer pane of the **Visual Studio Code** window, open the **index.js** file.

1.  On the code editor tab for the **index.js** file, delete all the code in the existing file.

1.  Add the following line of code to import the **azure-storage** package:

    ```javascript
    const azure = require('azure-storage');
    ```
    
1.  In the **index.js** class, enter the following line of code to create a new string constant named **storageConnectionString**:

    ```javascript
    const storageConnectionString = '<connection string to your account>';
    ```

1.  Update the **storageConnectionString** string constant by setting its value to the **Connection string** of the Storage account that you recorded earlier in this lab.

1.  In the **index.js** file, enter the following line of code to create a new string constant named **queueName** with a value of **messagequeue** :

    ```javascript
    const queueName = 'messagequeue';
    ```

1.  In the **index.js** file, enter the following code to create a new asynchronous **main** method:

    ```javascript
    async function main() {
    }

    main();
    ``` 

1.  Observe the **index.js** file, which should now include:

    ```javascript
    const azure = require('azure-storage');

    const storageConnectionString = '<connection string to your account>';
    const queueName = 'messagequeue';


    async function main() {
    }

    main();
    ```

#### Task 3: Validate Azure Storage access

1.  In the **main** method, add the following line of code to connect to the storage account by creating a new variable named *queueClient* of type **QueueClient**:

    ```javascript
    var queueClient = azure.createQueueService(storageConnectionString); 
    ```

1.  In the **main** method, add the following line of code to asynchronously create the queue if it doesn't already exist:

    ```javascript        
    var result = await queueClient.createQueueIfNotExists(queueName, 
        function (error){ if(error) console.log(`can not create queue ${error}`)});
    ```

1.  In the **main** method, add the following line of code to render a header for the "Account Metadata" section:

    ```javascript
    console.log('---Account Metdata---');
    ```
    
1.  In the **main** method, add the following line of code to render the Uniform Resource Identifier (URI) of the queue endpoint:

    ```javascript
    var url = queueClient.getUrl(queueName);
    console.log(`Account Uri:\t${url}`);
    ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {

        var queueClient = azure.createQueueService(storageConnectionString);
        var result = await queueClient.createQueueIfNotExists(queueName, 
            function (error){ if(error) console.log(`can not create queue ${error}`)});

        console.log('---Account Metdata---');

        var url = queueClient.getUrl(queueName);
        console.log(`Account Uri:\t${url}`);
    }
    ```

1.  Save the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the application:

    ```
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\11\\Solution\\MessageProcessor** folder.

1.  Observe the output from the currently running console application. The output contains metadata for the queue endpoint.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Review

In this exercise, you configured your project to access the Storage service and manipulate a queue made available through the service.

### Exercise 3: Add messages to the queue 

#### Task 1: Write code to access queue messages

1.  In the **main** method, add the following line of code to render a header for the "Existing Messages" section:

    ```javascript
    console.log('---Existing Messages---');
    ```

1.  Within the **main** method, perform the following actions to create variables that will be used when retrieving queue messages:

    1.  Add the following line of code to create a variable named *batchSize* with a value of **10**:

        ```javascript
        var batchSize = 10;
        ```

    1.  Add the following line of code to create a variable of type **TimeSpan** named *visibilityTimeout* with a value of **2.5 days**:

        ```javascript
        var visibilityTimeout = 60 * 60 * 24 * 2.5;  
        ```

1.  Within the **main** method, perform the following actions to retrieve a batch of messages asynchronously from the queue service:

    1.  Add the following line of code to invoke the **getMessages** asynchronous method of the **QueueClient** class, passing in the *batchSize* and *visibilityTimeout* variables as parameters:

        ```javascript
        result = await queueClient.getMessages(queueName, {numOfMessages: batchSize, visibilityTimeout: visibilityTimeout}, 
            async function (error, messages, response) {
            });        
        ```

1.  Within the **main** method, perform the following actions to iterate over and render the properties of each message:

    1.  Add the following line of code to create a **foreach** loop that iterates over each message that's stored in the **messages**.

        ```javascript
        async function (error, messages, response) {
            if (messages != undefined && messages.length > 0) {
                    messages.forEach(async function(message){
                       //place for the rest of the code
                    });
                }
        });
        ```

    1.  Within the **foreach** loop, add another line of code to render the **MessageId** and **MessageText** properties of each **QueueMessage** instance:
    
        ```javascript
        console.log(`[${message.messageId}]\t${message.messageText}`);       
        ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {

    var queueClient = azure.createQueueService(storageConnectionString);
    var result = await queueClient.createQueueIfNotExists(queueName, 
        function (error){ if(error) console.log(`can not create queue ${error}`)});

    console.log('---Account Metdata---');

    var url = queueClient.getUrl(queueName);
    console.log(`Account Uri:\t${url}`);
 
    console.log('---Existing Messages---');
    
    var batchSize = 10;
    var visibilityTimeout = 60 * 60 * 24 * 2.5;  //2.5d

    result = await queueClient.getMessages(queueName, {numOfMessages: batchSize, visibilityTimeout: visibilityTimeout}, 
        async function (error, messages, response) {
        
        if (messages != undefined && messages.length > 0) {
            messages.forEach(async function(message){
                console.log(`[${message.messageId}]\t${message.messageText}`);       
            });
        }
    });
    ```

1.  Save the **index.js** file.

#### Task 2: Test message queue access

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the  application:

    ```
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\11\\Solution\\MessageProcessor** folder.

1.  Observe the output from the currently running console application. The output indicates that no messages are in the queue.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

1.  In the Azure portal's navigation pane, select the **Resource groups** link.

1.  On the **Resource groups** blade, find and then select the **AsyncProcessor** resource group that you created earlier in this lab.

1.  On the **AsyncProcessor** blade, select the **asyncstor[yourname]** storage account that you created earlier in this lab.

1.  On the **Storage account** blade, select **Overview**. 

1.  In the **Overview** section, select **Open in Explorer**.

1.  In the **Azure Storage Explorer** window, select **Open Azure Storage Explorer**.

    > **Note**: If this is your first time opening Storage Explorer `by using the portal`, you might be prompted to allow the portal to open these types of links in the future. You should accept the prompt.

1.  In the **Azure Storage Explorer** application, you will notice a prompt to sign in to your Azure account. Sign in by performing the following actions:

    1.  In the popup dialog, select **Sign in**.

    1.  In the **Connect to Azure Storage** window, select **Add an Azure Account**, in the **Azure environment** list select **Azure**, and then select **Next**.

    1.  In the **Sign in to your account** popup window, enter the email address for your Microsoft account, and then select **Next**.

    1.  Still within the **Sign in to your account** popup window, enter the password for your Microsoft account, and then select **Sign in**.

    1.  In the **ACCOUNT MANAGEMENT** pane, select **Apply**.

    1.  Observe that you are returned back to the **EXPLORER** pane with your subscription information populated.

1.  From the **Azure Storage Explorer** application, in the **EXPLORER** pane, find and expand the **asyncstor[yourname]** storage account that you created earlier in this lab.

1.  Within the **asyncstor[yourname]** storage account, find and expand the **Queues** node.

1.  In the **Queues** node, open the **messagequeue** queue that you created earlier in this lab by using  code.

1.  On the **messagequeue** tab, select **Add Message**.

1.  In the **Add Message** pop-up window, perform the following actions:

    1.  In the **Message text** text box, enter the value **Hello World**.

    1.  In the **Expires in** text box, enter the value **12**.

    1.  In the **Expires in** drop-down list, select **Hours**.

    1.  Ensure that the **Encode message body in Base 64** check box isn't selected.

    1.  Select **OK**.

1.  Return to the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the application:

    ```
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\11\\Solution\\MessageProcessor** folder.

1.  Observe the output from the currently running console application. The output includes the new message that you created.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 3: Delete queued messages

1.  In the Explorer pane of the **Visual Studio Code** window, open the **index.js** file.

1.  On the code editor tab for the **index.js** file, find the existing **forEach** loop within the **main** method:

    ```javascript
    messages.forEach(async function(message){
        console.log(`[${message.messageId}]\t${message.messageText}`);       
        await queueClient.deleteMessage(queueName, message.messageId, message.popReceipt,
        function (error, response) {
            if(error) console.log(`message cannot be deleted ${error}`);
        });
    });
    ```

1.  Within the **forEach** loop, add a new line of code to invoke the **deleteMessage** method of the **QueueMessage** class, passing in the **messageId** and **popReceipt** properties of the *message* variable:

    ```javascript
    await queueClient.deleteMessage(queueName, message.messageId, message.popReceipt,
    function (error, response) {
        if(error) console.log(`message cannot be deleted ${error}`);
    });
    ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {

        // Existing code removed for brevity
        
        messages.forEach(async function(message){
            console.log(`[${message.messageId}]\t${message.messageText}`);       
            await queueClient.deleteMessage(queueName, message.messageId, message.popReceipt,
            function (error, response) {
                if(error) console.log(`message cannot be deleted ${error}`);
            });
        });
    }
    ```

1.  **Save** the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the application:

    ```cmd
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\11\\Solution\\MessageProcessor** folder.

1.  Observe the output from the currently running console application. The message that you created earlier in the lab still exists because it hasn't been deleted previously.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

1.  Return Storage Explorer, and then find and expand the **asyncstor[yourname]** storage account that you created earlier in this lab.

1.  In the **asyncstor[yourname]** storage account, find and expand the **Queues** node.

1.  In the **Queues** node, open the **messagequeue** queue that you created earlier in this lab by using  code.

1.  Observe the empty list of messages in the queue.

    > **Note**: You might need to refresh the queue.

#### Review

In this exercise, you read and deleted existing messages from the Storage queue by using the Node.js library.

### Exercise 4: Queue new messages by using Node.js

#### Task 1: Write code to create queue messages

1.  In the Explorer pane of the **Visual Studio Code** window, open the **index.js** file.

1.  On the code editor tab for the **index.js** file, find the existing **main** method.

1.  Within the **main** method, add a new line of code to render a header for the "New Messages" section:

    ```javascript
    console.log('---New Messages---');
    ```

1.  In the **main** method, perform the following actions to create and send a message asynchronously:

    1.  Add the following line of code to create a new string variable named *greeting* with a value of **Hi, Developer!**:

        ```javascript
        var greeting = 'Hi, Developer!';       
        ```

    1.  Add the following line of code to invoke the **createMessage** method of the **QueueClient** class by using the *greeting* variable as a parameter

        ```javascript
        result = await queueClient.createMessage(queueName, greeting, 
        function(error, results, response){
        // process sending 
        });       
        ```

    1.  Add the following line of code to render the content of the message that you sent. It need to be placed inside of processing function:

        ```javascript
        if(!error){
            console.log(`Sent Message:\t${greeting}`);
        }
        ```

1.  Observe the **main** method, which should now include:

    ```javascript
    async function main() {

        // Existing code removed for brevity
        
        console.log('---New Messages---');
        var greeting = 'Hi, Developer!';
        result = await queueClient.createMessage(queueName, greeting, function(error, results, response){
            if(!error){
                console.log(`Sent Message:\t${greeting}`);
            }
        });
    }
    ```

1.  **Save** the **index.js** file.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the application:

    ```
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **\\Allfiles\\Labs\\11\\Solution\\MessageProcessor** folder.

1.  Observe the output from the currently running console application. The content of the new message that you sent should be in the output.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: View queued messages by using Storage Explorer

1.  Return to Storage Explorer, and then find and expand the **asyncstor[yourname]** storage account that you created earlier in this lab.

1.  In the **asyncstor[yourname]** storage account, find and expand the **Queues** node.

1.  In the **Queues** node, open the **messagequeue** queue that you created earlier in this lab by using Node.js code.

1.  Observe the single new message in the list of messages in the queue.

    > **Note**: You might need to refresh the queue.

#### Review

In this exercise, you created new messages in the queue by using the Node.js library for Storage queues.

### Exercise 5: Clean up your subscription 

#### Task 1: Open Azure Cloud Shell and list resource groups

1.  In the Azure portal's navigation pane, select the **Cloud Shell** icon to open a new shell instance.

    > **Note**: The **Cloud Shell** icon is represented by a greater than sign (\>) and underscore character (\_).

1.  If this is your first time opening Cloud Shell using your subscription, you can use the **Welcome to Azure Cloud Shell Wizard** to configure Cloud Shell for first-time usage. Perform the following actions in the wizard:
    
    -   A dialog box prompts you to create a new storage account to begin using the shell. Accept the default settings, and then select **Create storage**. 

    > **Note**: Wait for Cloud Shell to finish its initial setup procedures before moving forward with the lab. If you don't notice Cloud Shell configuration options, this is most likely because you're using an existing subscription with this course's labs. The labs are written with the presumption that you're using a new subscription.

#### Task 2: Delete a resource group

1.  At the command prompt, enter the following command, and then select Enter to delete the **AsyncProcessor** resource group:

    ```
    az group delete --name AsyncProcessor --no-wait --yes
    ```
    
1.  Close the Cloud Shell pane in the portal.

#### Task 3: Close the active application

1.  Close the currently running Microsoft Edge application.

1.  Close the currently running Visual Studio Code application.

1.  Close the currently running Azure Storage Explorer application.

#### Review

In this exercise, you cleaned up your subscription by removing the resource group that was used in this lab.