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
var location = '10001'; // put your zip code here
var options = {
  host: 'www.wunderground.com',
  path: '/DisplayPollen.asp?Zipcode='+location
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
    var plevel = $('.levels').first().contents().filter(function() {
        return this.type === 'text';
    }).text();
    var plevel = null;
    $('.levels p').each(function(i, element){
      var a = $(this).text();
      if(plevel == null) {
        plevel = a;
      }
      console.log(a + "--" + getLevel(a));
    });
    console.log("Pollen forecast for today: " + getLevel(plevel));
  });
}).end();
