/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var forecast = require('./forecast');

/**
 * TheBees is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var TheBees = function () {
    AlexaSkill.call(this, APP_ID);
};
var location = null;

// Extend AlexaSkill
TheBees.prototype = Object.create(AlexaSkill.prototype);
TheBees.prototype.constructor = TheBees;

TheBees.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("TheBees onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
    console.log("TheBees userId: " + session.user.userId);
};

TheBees.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("TheBees onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "The Bees say hum a buzz buzz.";
    if(location==null) {
      speechOutput += " What is your zip code?";
    }
    response.ask(speechOutput);
};

TheBees.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("TheBees onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

TheBees.prototype.intentHandlers = {
    // register custom intent handlers
    PollenIntent: function (intent, session, response) {
      console.log("TheBees PollenIntent");
      if(intent.slots.zipCode) {
        var zip = intent.slots.zipCode.value;
        // TODO: decode the zip code if it was provided
      }
      if(location == null) {
        console.log("Location was null, overriden with default.");
        location = "10001";
      }
      console.log("Location (intent handler) = " + location);
      var speech = forecast.getForecast(location, function(result) {
        console.log("Inside the forecast result callback: " + result);
        var cardTitle = "Pollen Forecast";
        var cardContent = result;
        response.tellWithCard("The pollen level today is " + result, cardTitle, cardContent);
      });
    },
    LocationIntent: function (intent, session, response) {
      console.log("TheBees LocationIntent");
      if(intent.slots.zipCode) {
        zip = intent.slots.zipCode.value;
        // TODO: decode the zip code if it was provided
        var speech = "Your location is " + location + ".";
        var cardTitle = "Location";
        var cardContent = speech;
        response.tellWithCard(speech, cardTitle, cardContent);
      } else {
        response.ask("What was that zip code?");
      }
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the TheBees skill.
    var bees = new TheBees();
    bees.execute(event, context);
};
