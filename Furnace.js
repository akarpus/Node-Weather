var http = require('http'); //need to http
var url = require('url');

var furnaceON = {
  hostname: 'localhost',
  port: '3000',
  path: '/furnace?start=on'
}

var furnaceOFF = {
  hostname: 'localhost',
  port: '3000',
  path: '/furnace=off'
}


/*
var temperature = 20;  //degrees celsius

setInterval(function(){
   console.log('temperature: ' + temperature++)}, 1000);
*/

function handleResponse(response){
  var serverData = '';
  response.on('data', function(chunk){serverData += chunk});
  
  response.on('end', function(){
     console.log('Response Status: ', response.statusCode);
     console.log('Response Headers: ',response.headers);
     console.log(serverData);
     });
}

http.request(furnaceON, function(response){
   handleResponse(response);
}).end();


console.log('Client Running at http://127.0.0.1:3000  CNTL-C to quit');
