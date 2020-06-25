const azure = require('azure-storage');


const storageConnectionString = '<storage account connection string>';
const queueName = 'messagequeue';


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
                await queueClient.deleteMessage(queueName, message.messageId, message.popReceipt,function (error, response) {
                    if(error) console.log(`message cannot be deleted ${error}`);
                });
            });
        }
    });

    console.log('---New Messages---');
    var greeting = 'Hi, Developer!';
    result = await queueClient.createMessage(queueName, greeting, function(error, results, response){
        if(!error){
            console.log(`Sent Message:\t${greeting}`);
        }
    });
}

main();