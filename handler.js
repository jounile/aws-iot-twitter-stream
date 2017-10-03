'use strict';

console.log('Loading function');

var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();
var table = "iotMessages";

exports.handler = function(event, context) {

    console.log('Received event:', JSON.stringify(event, null, 2));

    var params = {
        TableName:table, Item:{
            "id": event.id,
            "user": event.user,
            "lang": event.lang,
            "location": event.location,
            "timezone": event.timezone,
            "message": event.message
        } 
    };
    
    console.log("Adding a new IoT message..."); 

    dynamo.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add message. Error JSON:", JSON.stringify(err, null, 2)); 
            context.fail();
        } else {
            console.log("Added message:", JSON.stringify(data, null, 2));
            context.succeed();
        }
    });
}
