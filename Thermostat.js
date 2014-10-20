/*
Simple server to serve a related peer client
*/

var http = require('http'); 
var url = require('url');

var temperature = 20;  

setInterval(function(){
   console.log('temperature: ' + temperature++)}, 2000);


http.createServer(function (request,response){
     var urlObj = url.parse(request.url, true, false);
     var query = urlObj.query;
     console.log("PATHNAME: " + urlObj.pathname);
     console.log('query: ' + urlObj.query);
     for(x in urlObj.query) console.log(x + ': ' + urlObj.query[x]);

     response.writeHead(200, {'Content-Type': 'text/html'});
     for(x in urlObj.query){ 
         response.write(x + ': ' +urlObj.query[x] + '<br>');}
     response.write('temperature: ' + temperature + '<br>');

     response.end('Message Received');

 }).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');
