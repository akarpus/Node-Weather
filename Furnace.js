var https = require('https'); //need to http
var url = require('url');
var fs = require('fs');

//private SSL key and signed certificate
var options = {
  key: fs.readFileSync('serverkey.pem'),
  cert: fs.readFileSync('servercert.crt')
};

var query = {
  hostname: 'localhost',
  port: '3000',
  path: '/furnace',
  rejectUnauthorized: false
}

setTimeout( function again(){
function handleResponse(response){
  var serverData = '';
  response.on('data', function(chunk){serverData += chunk});
  
  response.on('end', function(){
     if (serverData != '') {
	 console.log('------------------');
	 console.log(serverData);
	 console.log('------------------');
	 }
  });
}

https.request(query, function(response){
   handleResponse(response);}).end();
   setTimeout(again, 1000); //recursively restart timeout
}, 1000);

console.log('Client Running at http://127.0.0.1:3000  CNTL-C to quit');
