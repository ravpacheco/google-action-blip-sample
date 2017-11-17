
let Lime = require('lime-js');

const MY_MESSENGER_IDENTIFIER = "1639720059374062@messenger.gw.msging.net";
const MY_EMAIL = "ravpacheco%40gmail.com@mailgun.gw.msging.net";
const MESSENGER_BROADCAST_LIST = "jack+senders@broadcast.msging.net";
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
        req.body.result.parameters[key] :
        defaultValue;

        return parameter;
    },

    getPlainTextMessage: function(text, to){
        return {
            "to": to,
            "from": "jack@msging.net",
            "type": "text/plain",
            "content": text
        }
    },

    getMediaMessage: function(){
        return {
            id: Lime.Guid(),
            type: "application/vnd.lime.media-link+json",
            to: MY_MESSENGER_IDENTIFIER,
            content: {
              title: "Cat",
              text: "Here is a cat image for you!",
              type: "image/jpeg",
              uri: "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
              aspectRatio: "1:1",
              size: 227791,
              previewUri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX",
              previewType: "image/jpeg"
            }
        };
    },

    getSurveyMessage: function(){
        return {  
            "id": Lime.Guid(),
            "to": MESSENGER_BROADCAST_LIST,
            "type":"application/vnd.lime.select+json",
            "content":{
                "text":"Aqui estão os slides da palestra https://goo.gl/21eiEB 😉\n\n. Aproveitando, qual nota vc dá para a apresentação de 1 a 5 (onde 1 é ruim e 5 é ótimo) 🤔. Vote clicando em um dos botões abaixo: ⬇",
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




