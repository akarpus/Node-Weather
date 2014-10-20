var http = require('http'); //need to http
var url = require('url');
var fs = require('fs');
var path = require('path');
var userInput = require('readline');
var prompts = userInput.createInterface(process.stdin, process.stdout);
var increase = false;
var temp = 0;

var counter = 1000; //to count invocations of function(req,res)

var ROOT_DIR = 'public'; //dir for static files



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
	var extname = path.extname(urlObj.pathname); //get the extension

	fs.readFile(ROOT_DIR + urlObj.pathname, function(err,data){
	if(err){
		console.log('ERROR: ' + JSON.stringify(err));
	  	response.writeHead(404);
	  	response.end(JSON.stringify(err));
		return;
	 }

	var contentType = 'text/html'; //set the content type

	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
		break;
	}
	         
	response.writeHead(200, {'Content-Type': contentType});

	response.end(data);
	});

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
 //    response.writeHead(200, {'Content-Type': 'text/html'});
 //    for(x in urlObj.query){ 
 //        response.write(x + ': ' +urlObj.query[x] + '<br>');}
 //    response.write('temperature: ' + temp + '<br>');
	// response.end('Message Received');
 }).listen(3000);
