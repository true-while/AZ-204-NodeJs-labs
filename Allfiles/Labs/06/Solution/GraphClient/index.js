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

