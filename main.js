// from node standard library
var readline = require('readline')
var http = require('http')
var fs = require('fs')
var path = require('path')

// npm modules
var WebSocket = require('ws')

// our modules
var actions = require('./src/actions')

function main() {
  startWebSocketServer()
  startPrompt()
  startWebServer()
}

function startWebSocketServer() {
  var wss = new WebSocket.Server({port: 8080})
  wss.on('connection', function (ws) {
    // without this error handler, server would crash
    ws.on('error', function () { // handler for the 'error' event from this specific websocket
      // handle websocket e
    })
    ws.on('close', function () {})
    ws.on('message', function(message){
      actions.handleCommand(message)
    })
    // a browser just opened a WebSocket to us
    // send it the current game state
    var text = JSON.stringify(actions.game, null, 2)
    ws.send(text)

    // also send the state when it changes
    actions.subscribeToStateChanges(function (game) {
      var text = JSON.stringify(actions.game, null, 2)
      ws.send(text)
    })
  })
}

function startPrompt() {
  var rl = readline.createInterface({
    input: process.stdin,
  })
  rl.on('line',function (line){ //rl is the connection to the command line that we
    //have. this function says whenever there is a line of input call function
    // console.log('we got a line of input: ' + line) //to confirm input if we wanted to see it
    actions.handleCommand(line)
  })
}

function startWebServer(){ //starts the web server
  var host = '127.0.0.1' //local machine
  var port = 3000 //could be a variety of ports within a range, this is common
  var server = http.createServer(handleRequest) //we created handleRequest in order to handle requests and responses
  server.listen(port,host) //the server was set up, but we have to tell it to listen to what comes in on that port and host
}
//at this point the server will listen and receive requests, but will not respond. next function tells it how to respond
function handleRequest(req,res){
  // res.writeHead(200,{ //http header contains two types of things: status code and headers
  //   'content-type': 'text/plain' //in this case, we are using a header which tells us the type of content
  // })
  // var text = JSON.stringify(actions.game,null,2)
  // res.end(text) //this is what appears on screen when we go to that web address

  var html = readFrontendTextFile('game.html') //split the game.html into its own file for better management/organization

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(html)
}

function readFrontendTextFile(filename) { //in this instance, filename has the value of 'game.html'
  var filePath = path.join(__dirname, 'browser', filename)//__dirname refers to the current directory, and joins [current directory/frontend/game.html]
  var text = fs.readFileSync(filePath).toString('utf8')
  return text
}


main()
