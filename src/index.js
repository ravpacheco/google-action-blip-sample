/* eslint-disable no-console */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

let utils = require('./utils');
let desktopControl = require('./desktopControl');
let BlipHttpClient = require('./blip/BlipHttpClient');

const restService = express();
let currentNumberGenie = -1;

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/action', function (req, res) {

    var intentName = utils.getIntentNameFromRequest(req);
    var speech = utils.getRandomAffirmativeAnswer();

    let blipHttpClient = new BlipHttpClient('Ym90c2JyYXNpbGNvbmY6QTE4MjBEUHFmZXVKNjI2c3VYOWw='); 

    switch (intentName) {
        case 'Broadcast':

            var m = utils.getSurveyMessage();
            blipHttpClient.sendMessage(m);
            break;

        case 'Present':
            speech = 'Hello DevFest BH 2017!!!';
            break;

        case 'Command-Run':
            let command = utils.getParameterFromRequest(req, 'command', 'notepad')
            desktopControl.processRunCommand(command);
            break;

        case 'Command-Keyboard':

            let keyName = utils.getParameterFromRequest(req, 'keyboard-key', 'rigth')
            desktopControl.processKeyboardCommand(keyName);
            break;

        case 'Command-Mouse':
            desktopControl.processMouseCommand();
            break;

        case 'Photos':

            let photoType = utils.getParameterFromRequest(req, 'photo-type', 'beautiful');
            var m = utils.getSurveyMessage();
            blipHttpClient.sendMessage(m);
            speech += ' Your photo was sent to your messenger account';
            break;

        case 'Email':

            let emailSentence = utils.getParameterFromRequest(req, 'email-sentence', 'Default value!')

            var m = utils.getPlainTextMessage(emailSentence, utils.MY_EMAIL);
            blipHttpClient.sendMessage(m);

            speech += ' Your email was sent!';
            break;

        case 'Number-Genie':
            currentNumberGenie = utils.getPositiveRandomNumber(50);
            break;

        case 'Number-Genie-Answer':
            let numberGenie = utils.getParameterFromRequest(req, 'number', -1)
            if(numberGenie == currentNumberGenie){

            }else if(numberGenie > currentNumberGenie){

            }else if(numberGenie < currentNumberGenie){
                
            }
            break;

        default:
            speech = 'Sorry, I didn\'t understand you';
            break;
    }

    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.listen((process.env.PORT || 8000), function () {
    console.log("Listening...");
});