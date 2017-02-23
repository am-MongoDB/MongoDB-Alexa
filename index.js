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

        //this.emit(":tell", "Let me check for you");

        console.log("In CountIntent");

        var countURL = config.mongopopAPI + "checkInCount";
        var _this = this;

        request({url: countURL, json: true}, function (error, response, body) {
            console.log("in callback");
            if (error || response.statusCode != 200) {
                console.log("Failed to count checkins: " + error.message);
                _this.emit(':tellWithCard',
                    "Network error, check Alexa app for details",
                    "Mongo – Error",
                    "Network error: " + error.message,
                    {
                        smallImageUrl: "https://cdn3.iconfinder.com/data/icons/wifi-2/460/connection-error-512.png",
                        largeImageUrl: "https://cdn3.iconfinder.com/data/icons/wifi-2/460/connection-error-512.png"
                    }
                )
            } else {
                if (body.success) {
                    var successString = "Andrew has checked in " + body.count + " times.";
                    _this.emit(':tellWithCard',
                        successString,
                        "Mongo – Where's Andrew",
                        successString,
                        {   
                            smallImageUrl: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAALQAAAAJDhkZWUxZDQxLTM0NjctNDcxZS04NmJiLTA1YzRhNGVlNWY0ZQ.jpg",
                            largeImageUrl: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAALQAAAAJDhkZWUxZDQxLTM0NjctNDcxZS04NmJiLTA1YzRhNGVlNWY0ZQ.jpg"
                        }
                    )
                } else {
                    console.log("Failed to count checkins: " + body.error);
                    _this.emit(':tellWithCard',
                        "Application error, check Alexa app for details",
                        "Mongo – Error",
                        "Application error: " + body.error,
                        {
                            smallImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Sad_face.gif/1024px-Sad_face.gif" ,
                            largeImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Sad_face.gif/1024px-Sad_face.gif"
                        }
                    )
                }
            }
        })
    },
    "WhereIntent": function () {

    },
    "Unhandled": function () {
        this.emit(':tellWithCard',
            "Unhandled event",
            "Mongo – Error",
            "Unhandled event",
            {
                smallImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Sad_face.gif/1024px-Sad_face.gif",
                largeImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Sad_face.gif/1024px-Sad_face.gif"
            }
        )
    }
};
