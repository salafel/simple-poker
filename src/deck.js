module.exports = Deck;

function Deck() {
    this.suits = [ 's', 'h', 'd', 'c' ];
    this.ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
    this.cards = [];
    this.index = 0

    this.init();
    this.shuffle();
}

Deck.prototype.init = function() {
    var suitsLen = this.suits.length;
    var ranksLen = this.ranks.length;
    var i, j;

    for (i=0; i<suitsLen; i++) {
        for (j=0; j<ranksLen; j++) {
            this.cards.push( this.ranks[j] + this.suits[i] );
        }
    }
};

/**
 * Fisher-Yates Shuffle
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
Deck.prototype.shuffle = function() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.cards[currentIndex];
        this.cards[currentIndex] = this.cards[randomIndex];
        this.cards[randomIndex] = temporaryValue;
    }
};

Deck.prototype.drawCard = function (index) {
    return this.cards[index];
};
