const eventGrid = require('azure-eventgrid');
const msRestAzure = require('ms-rest-azure');
const { v1: uuidv1 } = require('uuid');
const url = require('url');

const topicEndPoint = '<your event grid end point>';
const topicKey = 'event grid key'; 

var topicCreds = new msRestAzure.TopicCredentials(topicKey);
var egClient = new eventGrid(topicCreds);
var topicUrl = url.parse(topicEndPoint, true);
let topicHostName = topicUrl.host;

function main() {

    var events = [];

    var firstPerson = {
            FullName : 'Alba Sutton',
            Address : '4567 Pine Avenue, Edison, WA 97202'
        };
 
    events.push(
        {
            id : uuidv1(),
            eventType : 'Employees.Registration.New',
            eventTime : new Date().toISOString(),
            subject : `New Employee: ${firstPerson.FullName}`,
            data : firstPerson,
            dataVersion : '1.0.0'
        });

    var secondPerson = {
            FullName : 'Alexandre Doyon',
            Address : '456 College Street, Bow, WA 98107'
        };

    events.push(
        {
            id : uuidv1(),
            eventType : 'Employees.Registration.New',
            eventTime : new Date().toISOString(),
            subject : `New Employee: ${secondPerson.FullName}`,
            data : secondPerson,
            dataVersion : '1.0.0'
        });    


    egClient.publishEvents(topicHostName, events).then((result) => {
        return Promise.resolve(console.log('Events published'));
      }).catch((err) => {
        console.log('An error ocurred ' + err);
      });

}

main();