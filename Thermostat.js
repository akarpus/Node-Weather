var https = require('https');
var url = require('url');
var ws = require("nodejs-websocket")		// *important: install the nodejs-websocket module
var fs = require('fs');
var path = require('path');
var userInput = require('readline');
var prompts = userInput.createInterface(process.stdin, process.stdout);
var increase = false;
var temp = 0;

var counter = 1000; 		//to count invocations of function(req,res)
var ROOT_DIR = 'public';	//dir for static files
var roomTemp = 20;			//degrees C
var furnaceIsOn = false;   	// boolean check for furnace
var targetTemp = 20;      
var pollON = true;
var pollOFF = true;

//private SSL key and signed certificate
var options = {
	key: fs.readFileSync('serverkey.pem'),
	cert: fs.readFileSync('servercert.crt')
};
						 
console.log("---------------------------");
prompts.question("Set House Temperature: ", function (houseTemp){
	console.log("---------------------------");
	console.log("House Temperature Set: " + houseTemp);
	console.log("---------------------------");
		
var Thermostat = require("./ThermostatClass.js"); 		//helper function class
var therm = new Thermostat(); 							//thermostat controlling furnace

// targetTemp = new Number(houseTemp);

therm.setThermostat(targetTemp);

therm.on("run", function() {
  furnaceIsOn = true;
  console.log("Furnace: ON");
  console.log("---------------------------");
});

therm.on("stop", function() {
  furnaceIsOn = false;
  console.log("Furnace: OFF");
  console.log("---------------------------");
});
 
//start a timeout timer and recursively restart it each time.
setTimeout( function again(){

   if(furnaceIsOn ) roomTemp++;
   else roomTemp--;
   therm.temp(roomTemp); 				//tell thermostat the room temp
   broadcast(targetTemp+" "+roomTemp);
   console.log('TEMPERATURE: ' + roomTemp);
   console.log('---------------------------');
   console.log('TARGET TEMPERATURE: ' + targetTemp);
   console.log('---------------------------');
   setTimeout(again, 2500); 			//recursively restart timeout
   }, 2500)
});

https.createServer(options, function (request,response){
	var urlObj = url.parse(request.url, true, false);
	var extname = path.extname(urlObj.pathname); //get the extension

	if (urlObj.pathname == "/")
		urlObj.pathname = "/index.html";

	fs.readFile(ROOT_DIR + urlObj.pathname, function(err,data){

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
	response.writeHead(200 , {'Content-Type': 'text/html'});
		if (urlObj.href == '/furnace' && furnaceIsOn && pollON) {
			response.end('FURNACE IS ON');	
			pollON = false;
			pollOFF = true;
		}
		else if (urlObj.href == '/furnace' && !furnaceIsOn && pollOFF){
			response.end('FURNACE IS OFF');
			pollON = true;
			pollOFF = false;
		}
 }).listen(3000);
 
var server = ws.createServer(function (connection) {
	connection.on("text", function (str) {
		broadcast(str) //output target temp
	})
})
server.listen(3001)

function broadcast(str) {
	server.connections.forEach(function (connection) {
		if (str == "incTemp") {
			console.log("TARGET TEMPERATURE INCREASED");
			++targetTemp;
		}
		else if (str =="decTemp") {
			console.log("TARGET TEMPERATURE DECREASED");
			--targetTemp;
		}
		connection.sendText(targetTemp+" "+roomTemp) 		//send back to client
	})
}