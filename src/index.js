/* eslint-disable no-console */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function (req, res) {
    var speech = req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.echoText ?
        req.body.result.parameters.echoText :
        "Seems like some problem. Speak again."

    var action = '';

    switch (action) {
        case '1':
            break;

        case '2':
            processMessengerRequest();
            break;

        default:
            break;
    }

    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

function processMessengerRequest() {
    
    let Lime = require('lime-js');
    let WebSocketTransport = require('lime-transport-websocket');
    let MessagingHub = require('messaginghub-client');
    let request = require('request-promise');

    // These are the MessagingHub credentials for this bot.
    // If you want to create your own bot, see http://blip.ai
    const IDENTIFIER = 'your-id';
    const ACCESS_KEY = 'your-pass';
    const MY_MESSENGER_NODE = 'X@gw.messenger';

    // instantiate and setup client
    let client = new MessagingHub.ClientBuilder()
        .withIdentifier(IDENTIFIER)
        .withAccessKey(ACCESS_KEY)
        .withTransportFactory(() => new WebSocketTransport())
        .build();

    // connect to the MessagingHub server
    client.connect()
        .then(() => {

            let message = {

            }

            client.sendMessage(message);
        })
        .catch((err) => console.error(err));
}

//remove this
restService.post('/slack-test', function (req, res) {

    var slack_message = {}
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        } 
    });
});

restService.listen((process.env.PORT || 8000), function () {
    console.log("Listening...");
});