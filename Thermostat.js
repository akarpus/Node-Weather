var http = require('http'); //need to http
var url = require('url');
var userInput = require('readline');
var prompts = userInput.createInterface(process.stdin, process.stdout);
var increase = false;
var temp = 0;

console.log("---------------------------");
prompts.question("Set House Temperature: ", function (temp){
	var message = "";
	if (temp > 0)
	console.log("---------------------------");
	console.log("House Temperature Set At: " + temp);
	console.log("---------------------------");
	
	setInterval(function(){
	increase = true;
	if (increase == true)
		console.log('temperature: ' + temp++)}, 2500);
	
});

http.createServer(function (request,response){
     var urlObj = url.parse(request.url, true, false);
     var query = urlObj.query;
     //console.log("PATHNAME: " + urlObj.pathname);
     //console.log('query: ' + urlObj.query);
     for(x in urlObj.query) {
		console.log(x + ': ' + urlObj.query[x]);
		/*if (urlObj.query[x] == 'on')
			increase = false;
			temp;*/
		}
     response.writeHead(200, {'Content-Type': 'text/html'});
     for(x in urlObj.query){ 
         response.write(x + ': ' +urlObj.query[x] + '<br>');}
     response.write('temperature: ' + temp + '<br>');
	 response.end('Message Received');
 }).listen(3000);
