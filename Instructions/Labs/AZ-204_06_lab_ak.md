---
lab:
    title: 'Lab: Authenticating to and querying Microsoft Graph by using MSAL SDK'
    az204Module: 'Module 06: Implement user authentication and authorization'
---

# Lab: Authenticating to and querying Microsoft Graph by using MSAL SDK

## Microsoft Azure user interface

Given the dynamic nature of Microsoft cloud tools, you might experience Azure UI changes after the development of this training content. These changes might cause the lab instructions and lab steps to not match up.

Microsoft updates this training course when the community brings needed changes to our attention; however, because cloud updates occur frequently, you might encounter UI changes before this training content updates. **If this occurs, adapt to the changes, and then work through them in the labs as needed.**

## Instructions

### Before you start

#### Review the installed applications

Find the taskbar on your Windows 10 desktop. The taskbar contains the icons for the applications that you'll use in this lab:
    
-   Microsoft Edge

-   Visual Studio Code

### Exercise 1: Create an Azure Active Directory (Azure AD) application registration

#### Task 1: Open the Azure portal

1.  On the taskbar, select the **Microsoft Edge** icon.

1.  In the open browser window, go to the Azure portal (<https://portal.azure.com>).

1.  Enter the email address for your Microsoft account, and then select **Next**.

1.  Enter the password for your Microsoft account, and then select **Sign in**.

    > **Note**: If this is your first time signing in to the Azure portal, you'll be offered a tour of the portal. Select **Get Started** to skip the tour and begin using the portal.

#### Task 2: Create an application registration

1.  In the Azure portal's navigation pane, select **All services**.

1.  From the **All services** blade, select **Azure Active Directory**.

1.  From the **Azure Active Directory** blade, select **App registrations** in the **Manage** section.

1.  In the **App registrations** section, select **New registration**.

1.  In the **Register an application** section, perform the following actions:

    1.  In the **Name** text box, enter **graphapp**.

    1.  In the **Supported account types** list, select the **Accounts in this organizational directory only (Default Directory only - Single tenant)** check box.

    1.  In the **Redirect URI** drop-down list, select **Web Client**.

    1.  In the **Redirect URI** text box, enter **http\://localhost**.

    1.  Select **Register**.

#### Task 3: Enable the default client type

1.  In the **graphapp** application registration blade, select **Authentication** in the **Manage** section.

1.  In the **Authentication** section, perform the following actions:

    1.  In the **Default client type** subsection, select **Yes**.

    1.  Select **Save**.

#### Task 4: Record unique identifiers

1.  On the **graphapp** application registration blade, select **Overview**.

1.  In the **Overview** section, find and record the value of the **Application (client) ID** text box. You'll use this value later in the lab.

1.  In the **Overview** section, find and record the value of the **Directory (tenant) ID** text box. You'll use this value later in the lab.

1.  In the **Certificates & secrets** section, create new key by click on **Add a client secret** button. Copy **Value** from generated key. You'll use this value later in the lab. 

#### Task 5: Assign required permission

1. The application you register above does not have an access to the graph API to read the users list. In next step you will setup requeued permissions 

1. From the application page where you copy directory id you need select **API permissions**. 

1. Click on the **+ Add a permission** button and select **Microsoft Graph**. Then select **Application permission**

1. From the search permission button type: **user.read.all** and select the permission and click on **Add permission** button. You will be returned to the permission page. 

1. From the permission page click on the button **Grant admin consent to default directory**. Your application is ready to retrieve users list.   


#### Review

In this exercise, you created a new application registration and recorded important values that you'll need later in the lab.

### Exercise 2: Obtain a token by using the MSAL library

#### Task 1: Create a project

1.  On the **Start** screen, select the **Visual Studio Code** tile.

1.  On the **File** menu, select **Open Folder**.

1.  In the **File Explorer** window that opens, browse to **Allfiles (F):\\Allfiles\\Labs\\06\\Starter\\GraphClient**, and then select **Select Folder**.

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to create a new project named **GraphClient** in the current folder:

    ```
    npm init -y
    ```

    > **Note**: The **npm init** command will create a new **package.json** file in a folder with the default parameters you can change the defaults to your values.

1.  At the command prompt, enter the following commands to install required packages from NuGet:

    ```
    npm install axios
    npm install qs
    npm install request
    ```

1. Create new file named **index.js** file and provide following code:

    ```javascript
    async function main() {
    }

    main ();
    ```
1. At the command prompt, enter the following command, and then select Enter to run the application:

    ```
    node .\index.js
    ```

1.  There is no output from the application on this step. Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Task 2: Modify the index.js file

1.  In the Explorer pane of the **Visual Studio Code** window, open the **index.js** file.
    
1.  Add the following lines of code to add directives for the referenced packages that will be used in this file:

    ```javascript
    const axios = require('axios');
    const qs = require('qs');
    const request = require('request');
    ```

1.  Enter the following code to the top of the **index.js** file:

    ```javascript
    const appid = '<your app id>';
    const appsecret = '<your app key>';
    const tenantid = '<your tenant id>';
    const endpoint =`https://login.microsoftonline.com/${tenantid}/oauth2/v2.0/token`;
    const scope = 'https://graph.microsoft.com/.default';
    ``` 
    
1.  In the **index.js** file, enter the following code to create before **main** method:

    ```javascript
    const postData = {
        client_id: appid,
        scope: scope,
        client_secret: appsecret,
        grant_type: 'client_credentials'
    };
    ```

1.  Update the **appid** string constant by setting its value to the **Application (client) ID** that you recorded earlier in this lab.

1.  Update the **appsecret** string constant by setting its value to the **Application Key** that you recorded earlier in this lab.

1.  Update the **tenantid** string constant by setting its value to the **Directory (tenant) ID** that you recorded earlier in this lab.

1.  Observe the **index.js** file, which should now include:

    ```javascript
    const appid = '<your app id>';
    const appsecret = '<your app key>';
    const tenantid = '<your tenant id>';
    const endpoint =`https://login.microsoftonline.com/${tenantid}/oauth2/v2.0/token`;
    const scope = 'https://graph.microsoft.com/.default';

    const axios = require('axios');
    const qs = require('qs');
    const request = require('request');

    const postData = {
        client_id: appid,
        scope: scope,
        client_secret: appsecret,
        grant_type: 'client_credentials'
    };

    async function main() {
   
    }

    main();
    ```

#### Task 3: Obtain a Microsoft Authentication Library (MSAL) token

1.  In the **main** method, add the following line of code to update parameters for *axios*:

    ```javascript
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    ```

1.  In the **Main** method use axios to obtain the token:

    ```javascript
    await axios
        .post(endpoint, qs.stringify(postData))
        .then(response => {

        })
        .catch(error => {
        console.log(error);
        });   
    ```

1.  Update the post method handler to use obtained toke to call graph api and get the users list:

    ```javascript
    var accessToken = response.data.access_token;

                request.get({
                    url: "https://graph.microsoft.com/v1.0/users",
                    headers: {
                    "Authorization": "Bearer " + accessToken
                    }
                }, function(err, response, body) {
                    var json = JSON.parse(body);
                    json.value.forEach(element => {
                        console.log(`Name:\t${element.displayName}`);
                        console.log(`AAD Id:\t${element.id}`);      
                    });
                });
    ```

1.  Your method **main** finally should looks like following:

    ```javascript
    async function main() {
    
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    
    await axios
        .post(endpoint, qs.stringify(postData))
        .then(response => {
        var accessToken = response.data.access_token;

            request.get({
                url: "https://graph.microsoft.com/v1.0/users",
                headers: {
                "Authorization": "Bearer " + accessToken
                }
            }, function(err, response, body) {
                var json = JSON.parse(body);
                json.value.forEach(element => {
                    console.log(`Name:\t${element.displayName}`);
                    console.log(`AAD Id:\t${element.id}`);      
                });
            });
        })
        .catch(error => {
        console.log(error);
        });   
    }
    ```

1.  Save the **index.js** file.

#### Task 4: Test the updated application

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command to run the application:

    ```
    node .\index.js
    ```

    > **Note**: If there are any build errors, review the **index.js** file in the **Allfiles (F):\\Allfiles\\Labs\\06\\Solution\\GraphClient** folder.

1.  The running console application will automatically return list of the users with ID and Name.

1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Review

In this exercise, you acquired a token from the Microsoft identity platform by using the MSAL library.

### Exercise 3: Query Microsoft Graph by using the Graph SDK

#### Task 1: Setup Web application to get access user information from Graph. 

1.  From the **Visual Studio Code** open a folder located in  **Allfiles (F):\\Allfiles\\Labs\\06\\Starter\\WebGraphClient**.

    >**Note**: you are open a complete solution. To build the solution from scratch you can follow the [tutorial](https://docs.microsoft.com/en-us/graph/tutorials/node?tutorial-step=1)


1. Open file **.env** and update file with **Application (client) ID** and  **Application key**. You can reuse the application you create in the previous exercise, but make sure you enable `ID token`. Select **Authentication** under **Manage**. Locate the **Implicit grant** section and enable **ID tokens**. Select Save. 

    >**Note**: All details about creating new app you can find in following
    [instruction](https://docs.microsoft.com/en-us/graph/tutorials/node?tutorial-step=2). 

1. Also you need to add following callback to `Redirect URIs` **http://localhost:3000/auth/callback**

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the command prompt, enter the following command, and then select Enter to import packages from NPM:

    ```
    npm install
    ```

1.  Now your application is ready to start. 

#### Task 4: Test the updated application

1.  In the **Visual Studio Code** window, right-click or activate the shortcut menu for the Explorer pane, and then select **Open in Terminal**.

1.  At the open command prompt, enter the following command, and then select Enter to run the web application:

    ```
    npm start
    ```

1.  Your web application should be started and you can load start page from browser <http://localhost:3000> 

1.  From the main page click on the button `Click here to sign in`. You should be forwarded to Azure AD page where you can enter your account credential.

1. After signs in you should see your name in the top right coroner. Also you can see the welcome message with your name from center of the main page. This is result of accessing your profile information from graph API `/me`

1.  On the top of the screen you will see the link `Calendar`. By clicking on the link you will get access to the calendar requested by graph API `/me/events`
    
1.  Select **Kill Terminal** or the **Recycle Bin** icon to close the currently open terminal and any associated processes.

#### Review

In this exercise, you queried Microsoft Graph by using the SDK and MSAL-based authentication.

### Exercise 4: Clean up your subscription 

#### Task 1: Delete the application registration in Azure AD

1.  Return to the browser window with the Azure portal.

1.  In the Azure portal's navigation pane, select **All services**.

1.  From the **All services** blade, select **Azure Active Directory**.

1.  From the **Azure Active Directory** blade, select **App registrations** in the **Manage** section.

1.  In the **App registrations** section, select the **graphapp** Azure AD application registration that you created earlier in this lab.

1.  In the **graphapp** section, perform the following actions:

    1.  Select **Delete**.

    1.  In the confirmation pop-up dialog box, select **Yes**.

#### Task 2: Close the active applications

1.  Close the currently running Microsoft Edge application.

1.  Close the currently running Visual Studio Code application.

#### Review

In this exercise, you cleaned up your subscription by removing the application registration used in this lab.