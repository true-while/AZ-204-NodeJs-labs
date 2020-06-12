'use strict';
const request = require('request');

module.exports = {
    PostImage: function (urlAPI, img) {
        if (!urlAPI) { throw new Error('Set your environment variables for your ApiUrl link.'); }

        var options = {
           method: 'POST',
           uri: urlAPI,
           headers : {
          },
          formData: {
            'img': {
              'value': img.data,
              'options': {
                'filename': 'cat1.png'
              }
            }
          }
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(`WebAPI response:${body}`);
                resolve(body); 
              }); 

        });
    },

    LoadImages: function (urlAPI) {

        if (!urlAPI) { throw new Error('Set your environment variables for your ApiUrl link.'); }

        const options = {
            uri: urlAPI,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, (error, response, body) => {
                if (error) {
                    console.log('Error: ', error);
                    reject(error.message);
                    return;
                }
                var array = JSON.parse(body);
                resolve(array);
            });
        });
    }
}


