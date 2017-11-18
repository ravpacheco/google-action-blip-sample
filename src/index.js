/* eslint-disable no-console */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

let utils = require('./utils');
let desktopControl = require('./desktopControl');
let BlipHttpClient = require('./blip/BlipHttpClient');

const restService = express();
let numberGenie = -1;

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/action', function (req, res) {

    var intentName = utils.getIntentNameFromRequest(req);
    var speech = utils.getRandomAffirmativeAnswer();

    let blipHttpClient = new BlipHttpClient('amFjazE6cHhBbUFVM0s5Z2V5YWM2QndBZjU='); 

    switch (intentName) {
        case 'Broadcast':
            var m = utils.getSurveyMessage();
            blipHttpClient.sendMessage(m);
            break;

        case 'Present':
            speech = 'Hello DevFest BH 2017!!!';
            break;

        case 'Command-Run':
            let command = utils.getParameterFromRequest(req, 'command', 'notepad').toLowerCase();
            desktopControl.processRunCommand(command);
            break;

        case 'Command-Keyboard':
            let keyName = utils.getParameterFromRequest(req, 'keyboard-key', 'rigth').toLowerCase();
            desktopControl.processKeyboardCommand(keyName);
            break;

        case 'Command-Mouse':
            desktopControl.processMouseCommand();
            break;

        case 'Type':
            let text = utils.getParameterFromRequest(req, 'text', 'Some text').toLowerCase();
            desktopControl.processTextCommand(text);
            break;

        case 'Photos':

            var m = utils.getMediaMessage();
            blipHttpClient.sendMessage(m);
            speech += ' Your photo was sent to your messenger account';
            break;

        case 'Email':
            let emailSentence = utils.getParameterFromRequest(req, 'email-sentence', 'Default value!').toLowerCase();

            var m = utils.getPlainTextMessage(emailSentence, utils.MY_EMAIL);
            blipHttpClient.sendMessage(m);

            speech += ' Your email was sent!';
            break;

        case 'Number-Genie':
            numberGenie = utils.getPositiveRandomNumber(10);

            speech += ' I get a number. Do you know what is this number ?'
            break;

        case 'Number-Genie-Answer':
            let currentNumberGenie = utils.getParameterFromRequest(req, 'number', -1)
            if(currentNumberGenie == -1){
                speech = 'Sorry try again. I didn\'t get your number';
            }else if(numberGenie == currentNumberGenie){
                speech = 'Wow, perfect. You are right. The number correct is: ' + currentNumberGenie;
            }else if(numberGenie < currentNumberGenie){
                speech = 'No, the number is less than ' + currentNumberGenie;
            }else if(numberGenie > currentNumberGenie){
                speech = 'No, the number is greater than ' + currentNumberGenie;
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