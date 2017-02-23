"use strict";

var Alexa = require("alexa-sdk");
var request = require("request");
var config = require("./config.js");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = config.appId;

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    "AMAZON.HelpIntent": function () {
    this.emit(':tellWithCard',
        "Ask where Andrew is or ask how many times he has checked in",
        "Mongo – Where's Andrew",
        "Ask where Andrew is or ask how many times he has checked in",
        {
            smallImageUrl: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAALQAAAAJDhkZWUxZDQxLTM0NjctNDcxZS04NmJiLTA1YzRhNGVlNWY0ZQ.jpg",
            largeImageUrl: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAALQAAAAJDhkZWUxZDQxLTM0NjctNDcxZS04NmJiLTA1YzRhNGVlNWY0ZQ.jpg"
        }
    )},
    "CountIntent": function () {






        request({url: finalDocURL, json: true}, function (error, response, body) {
            if (error || response.statusCode != 200) {
                console.log("Failed to fetch documents: " + error.message);
                reject(error.message);
            } else {
                resolve(body);
            }
        })

    },
    "WhereIntent": function () {

    }
};
