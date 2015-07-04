'use strict';
var http = require("http");
var cheerio = require("cheerio");

var pollenLevels = {
  "very low": [0.0,2.5],
  "low": [2.5,4.9],
  "moderate": [4.9,7.3],
  "high": [7.3,9.7],
  "very high": [9.7,12.0]
};
var getLevel = function(value) {
  for (var k in pollenLevels) {
    if (pollenLevels.hasOwnProperty(k)) {
        var range = pollenLevels[k];
        if(value >= range[0] && value < range[1]) {
          return k;
        }
    }
  }
  return value;
};
var forecast = (function () {
  return {
    getForecast: function(location, callback) {
      console.log("Location (getForecast) = " + location);

      //http://www.wunderground.com/DisplayPollen.asp?Zipcode=
      var options = {
        host: "www.wunderground.com",
        path: "/DisplayPollen.asp?Zipcode="+location
      };
      var str = '';
      http.request(options, function(response) {
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function(chunk){
          str += chunk;
        });
        //the whole response has been recieved, so now we can scrap out the data
        response.on('end', function(){
          var $ = cheerio.load(str);
          var plevel = null;
          $('.levels p').each(function(i, element){
            var a = $(this).text();
            if(plevel == null) {
              plevel = a;
            }
            var b = $(this).html();
            console.log(a + "--" + b);
          });
          var description = getLevel(plevel);
          console.log("Got the forecast: " + description + " (" + plevel + ")");
          if(callback) {
            callback(description);
          } else {
            console.log("callback is undefined!");
          }
        });
      }).end();
    }
  };
})();
module.exports = forecast;
