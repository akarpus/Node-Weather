# Node Weather Application

A prototype application of an internet controlled home heating system. The system consists of three separate modules and an API all communicating through HTTP or HTTPS.

## Modules
- Thermostat Application, 
- Furnace Application, 
- Browser and  
- Open Weather Map API

## Installation

To run the programs simultaneously, nodejs-websocket module needs to be installed. To do so, run the following command to install the module: 
``` sh
$ npm install nodejs-websocket
```
### Running the Applications in the Terminal

1. Clone the repository
2. Open two command shells.
3. Input "```node Thermostat.js```" to initiate the Thermostat application in the first shell.
4. Input "```node Furnace.js```" to initiate the Furnace application in the second shell.
5. Input a temperature as user input in the thermostat application and observe the HTTP/HTTPS interaction.

### Controlling the Applications through Browser

1. Input "```127.0.0.1:3000```" into a browser to control and view the thermostat/furnace applications and weather API.

## Feedback

If you haven comments/suggestions with this project, feel free to email myself or Eric through the contact information listed on our github profiles, or better yet, tweet us!

## Developers

- Anton Karpus ```@a_karpus```
- Eric Tran ```@EricTran5791```
