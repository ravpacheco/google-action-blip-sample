/* eslint-disable no-console */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();
const affirmativeAnswers = ['Yes.', 'Yes Sr.', 'Of course.', 'Ok.', 'Its done.'];

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/action', function (req, res) {
    var intentName = req.body.result &&
        req.body.result.metadata &&
        req.body.result.metadata.intentName ?
        req.body.result.metadata.intentName :
        'Sorry, there are some problem to process your question. Speak again.';

    var speech = '';

    let i = Math.floor(Math.random() * affirmativeAnswers.length);
    speech = affirmativeAnswers[i];

    switch (intentName) {
        case 'Present':
            speech = 'Hello everybody. My name is James. I was created by Rafael to help him present to you some features of Google Actions, Home and BLiP Plataform';
            break;

        case 'Command-Keyboard':

            let keyName = req.body.result &&
                req.body.result.parameters &&
                req.body.result.parameters['keyboard-key'] &&
                req.body.result.parameters['keyboard-key'] !== '' ?
                req.body.result.parameters['keyboard-key'].toLowerCase() :
                'right';

            processCommand('key', keyName);
            break;

        case 'Command-Mouse':
            processCommand('mouse', 'move');
            break;

        case 'Photos':
            processMessengerRequest();
            speech += ' Your photo was sent to your messenger account';
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

function processCommand(target, operation) {

    var robot = require("robotjs");

    if (target === 'key') {
        console.log(operation);
        robot.keyTap(operation);
    } else {
        // Speed up the mouse.
        robot.setMouseDelay(4);

        var twoPI = Math.PI * 2.0;
        var screenSize = robot.getScreenSize();
        var height = (screenSize.height / 2) - 10;
        var width = screenSize.width;

        for (var x = 0; x < width; x++) {
            let y = height * Math.sin((twoPI * x) / width) + height;
            robot.moveMouse(x, y);
        }
    }
}

function processMessengerRequest() {

    let Lime = require('lime-js');
    let WebSocketTransport = require('lime-transport-websocket');
    let MessagingHub = require('messaginghub-client');
    let request = require('request-promise');

    // These are the MessagingHub credentials for this bot.
    // If you want to create your own bot, see http://blip.ai
    const IDENTIFIER = 'jamesassistant';
    const ACCESS_KEY = 'UndDU0todkg3OHV2UlIzVXRxNG0=';
    const MY_MESSENGER_NODE = '1391455114223371@messenger.gw.msging.net';

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
                id: Lime.Guid(),
                to: MY_MESSENGER_NODE,
                type: "application/vnd.lime.media-link+json",
                content: {
                    title: "Gato",
                    text: "Segue uma imagem de um gato",
                    type: "image/jpeg",
                    uri: "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
                    previewUri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX",
                    previewType: "image/jpeg"
                }
            }

            client.sendMessage(message);
            client.close();
        })
        .catch((err) => console.error(err));
}

restService.listen((process.env.PORT || 8000), function () {
    console.log("Listening...");
});