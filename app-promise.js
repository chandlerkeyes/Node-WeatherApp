const yargs = require('yargs');
const axios = require('axios');
const weather = require('./Weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBuQMUV9AMu94YXizkJa2vbJ6WWzQSpJME&address=${encodedAddress}`;

  axios.get(geocodeURL).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
      }
      var lat = response.data.results[0].geometry.location.lat;
      var long = response.data.results[0].geometry.location.lng;
      weatherURL = `https://api.darksky.net/forecast/5c4cc9ee8275599b92db6da81ab86bfc/${lat},${long}`;
      console.log(response.data.results[0].formatted_address);
      return axios.get(weatherURL);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
  }).catch((e) => {
    if (e.code === "ENOTFOUND") {
      console.log('unable to connect to api servers');
    } else {
      console.log(e.message);
    }
  })
