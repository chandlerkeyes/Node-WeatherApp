const request = require('request');

var getWeather = (lat, long, callback) => {
request({
  url: `https://api.darksky.net/forecast/5c4cc9ee8275599b92db6da81ab86bfc/${lat},${long}`,
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    callback(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
  } else {
    callback('Unable to fetch weather');
  }
});
};

module.exports.getWeather = getWeather;
