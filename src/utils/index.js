
let Lime = require('lime-js');

const MY_MESSENGER_IDENTIFIER = "128271320123982@messenger.gw.msging.net";
const MY_EMAIL = "ravpacheco%40@mailgun.gw.msging.net";
const MESSENGER_BROADCAST_LIST = "botsbrasilconf+senders@broadcast.msging.net";
const affirmativeAnswers = ['Yes.', 'Yes Sir.', 'Of course.', 'Ok.', 'Its done.'];

module.exports = {

    MY_MESSENGER_IDENTIFIER: MY_MESSENGER_IDENTIFIER,
    MY_EMAIL: MY_EMAIL,

    getIntentNameFromRequest: function (req){
        return req.body.result &&
        req.body.result.metadata &&
        req.body.result.metadata.intentName ?
        req.body.result.metadata.intentName :
        'Sorry, there are some problem to process your question. Speak again.';
    },

    getRandomAffirmativeAnswer: function(){
        let i = this.getPositiveRandomNumber(affirmativeAnswers.length);
        return affirmativeAnswers[i];
    },

    getPositiveRandomNumber: function(max){
        return Math.floor(Math.random() * max);;
    },

    getParameterFromRequest: function(req, key, defaultValue){
        let parameter = req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters[key] &&
        req.body.result.parameters[key] !== '' ?
        req.body.result.parameters[key].toLowerCase() :
        defaultValue;

        return parameter;
    },

    getPlainTextMessage: function(text, to){
        return {
            "id": Lime.Guid(),
            "to": to,
            "type": "text/plain",
            "content": text
        }
    },

    getSurveyMessage: function(){
        return {  
            "id": Lime.Guid(),
            "to": MESSENGER_BROADCAST_LIST,
            "type":"application/vnd.lime.select+json",
            "content":{
                "text":"Qual nota vc dá para a palestra de 1 a 5 (onde 1 é ruim e 5 é ótimo) 🤔. Vote clicando em um dos botões abaixo: ⬇",
                "scope": "immediate",
                "options":[
                    {
                        "order":1,
                        "text":"1",
                        "type":"application/vnd.custom.trigger+json",
                        "value":{
                            "stepId":"survey",
                            "payload":1
                        }

                    },
                    {
                        "order":2,
                        "text":"2",
                        "type":"application/json",
                        "value":{
                            "stepId":"survey",
                            "payload":2
                        }
                    },
                    {
                        "order":3,
                        "text":"3",
                        "type":"application/json",
                        "value":{
                            "stepId":"survey",
                            "payload":3
                        }
                    },
                    {
                        "order":4,
                        "text":"4",
                        "type":"application/json",
                        "value":{
                            "stepId":"survey",
                            "payload":4
                        }
                    },
                    {
                        "order":5,
                        "text":"5",
                        "type":"application/json",
                        "value":{
                            "stepId":"survey",
                            "payload":5
                        }
                    }
                ]
            }
        };
    }
}




