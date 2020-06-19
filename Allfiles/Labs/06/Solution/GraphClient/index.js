const appid = '231e1b36-445b-475e-93b9-545e3c6b2309';
const appsecret = 'qOL~_8-wzh1.79-Bz50YCfX6b87n9XO_Os';
const tenantid = '57abfb88-2c2a-4e22-ad26-a2a845843584';
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





main();

/*const Msal = require('msal');
const MicrosoftGraph = require('@microsoft/microsoft-graph-client');

const clientId = '213721b2-aef7-42cb-9d33-7ac80edfb2d4';
const tenantId = '57abfb88-2c2a-4e22-ad26-a2a845843584';
const graphMeEndpoint = 'https://graph.microsoft.com/v1.0/me';
 
const redirectUri = "http://localhost";

const msalConfig = {
    auth: {
        clientId: clientId,
        redirectUri: redirectUri
     }
};
//authority: `https://login.microsoftonline.com/${tenantId}/`,

const msalApplication = new Msal.UserAgentApplication(msalConfig);
const options = new MicrosoftGraph.MSALAuthenticationProviderOptions(graphScopes);
const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(msalApplication, options);
*/

/*
const express = require('express');
const morgan = require('morgan');
const path = require('path');

//initialize express.
const app = express();

// Initialize variables.
const port = 3000; // process.env.PORT || 3000;

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Set the front-end folder to serve public assets.
app.use(express.static('graph'))

// Set up a route for index.html.
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the server.
app.listen(port);
console.log('Listening on port ' + port + '...');

*/