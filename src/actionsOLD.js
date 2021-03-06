//this file contains all actions needed for taking in any input from the user and acting on it
var cards = require('cards');
var deck = new cards.PokerDeck();
deck.shuffleAll();

var game = { //this starts a game with objects called players. the [] means its an undefined list of players, as we will define them with user inputs and the addPlayer function.
  players: [],
  board: {
    flop: [],
    turn: [],
    river: [],
  },
}

var stateSubscribers = [] //why do we need this?

var dealer = 0 //index of player who is dealer
var lastBet = 0 //keeps track of most recent bet amount
var playerTurn = 0 //index of current player's turn

function subscribeToStateChanges(callback) { //what is callback?
  stateSubscribers.push(callback)
}

function handleStateChange() { //what is the purpose of this function?
  for (var subscriber of stateSubscribers) {
    subscriber(game)
  }
}

function addPlayer(name){ //addPlayer takes name and chips as starting arguments
  var newPlayer = {
    name: name,
    chips: 100,
    hand: [],
    bet: 0,
    lastAction: "",
    status: 0, //running count of all player moves assigned to a player upon making a move
    inPot: 0,
  }
  game.players.push(newPlayer) //this is how we add a new player to the list of players of the game
  handleStateChange()
}

function handleCommand(command){
  if (command.startsWith('add ')) {
    var name = command.substring(4)
    addPlayer(name)
    }
  else if (command.startsWith('chips ')){
    var name = command.substring(6)
    addChips(name,100)
    }
  else if (command === 'deal'){
    dealCards()
    }
  else if (command === 'flop'){
    dealFlop()
      }
  else if (command === 'turn'){
    dealTurn()
      }
  else if (command === 'river'){
    dealRiver()
      }
  else if (command === 'bet'){
    var wager = command.substring(4)
    placeBet(wager)
      }
  // else if (command === 'call'){
  //   placeBet('max bet - current bet')//how do i look at the list of players and find the max value in the bet field? do i make an array of all the bet values, then extract the max?
  //     for (var i = 0; i < game.players.length; i++){
  //     ??
  //   }
  //     }
  }

  // function call(){
  //
  // }

// function placeBet(wager){
//   //var x = game.players.index of the player with the highest status value
//       game.players[x].chips += chips
//       }
//     }
//     handleStateChange()
//   }


function dealRiver(){
  if(game.board.flop.length == 3){
    if(game.board.turn.length == 1){
      while(game.board.river.length < 1){
        for (var i = 0; i < 1; i++){
          var card = deck.draw();
          var dealCards = {
          "value": card.value,
          "suit": card.suit,
          }
        game.board.river.push(dealCards);
        }
      }
    }
  }
  handleStateChange()
}

function dealTurn(){
  if(game.board.flop.length == 3){
    while(game.board.turn.length < 1){
      for (var i = 0; i < 1; i++){
        var card = deck.draw();
        var dealCards = {
        "value": card.value,
        "suit": card.suit,
        }
      game.board.turn.push(dealCards);
      }
    }
  }
  handleStateChange()
}

function dealFlop(){
  while(game.board.flop.length <= 2){
    for (var i = 0; i < 3; i++){
      var card = deck.draw();
      var dealCards = {
      "value": card.value,
      "suit": card.suit,
      }
    game.board.flop.push(dealCards);
    }
  }
  handleStateChange()
}

function dealCards(){
  while(game.players[0].hand.length <= 1){
    for (var i = 0; i < game.players.length; i++){
      var card = deck.draw();
      var hand = {
      "value": card.value,
      "suit": card.suit,
      }
    game.players[i].hand.push(hand);
    }
  }
  handleStateChange()
}

function addChips(name,chips){
  for (var i = 0; i < game.players.length; i++){
    if(game.players[i].name == name){
      game.players[i].chips += chips
      }
    }
    handleStateChange()
  }


module.exports = { //this tells other files that require actions.js what part is exported. we still have to require it elsewhere.
  handleCommand: handleCommand,
  game: game, //we have to export game in order to show the game state on the web server
  subscribeToStateChanges: subscribeToStateChanges,
}
