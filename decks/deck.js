class Deck {
    constructor() {
        this.deck = [];
        this.hand = [];
        this.destroyedCards = [];
        this.discardPile = [];
    }
    add(card) {
        this.deck.push(card)
        this.updateCounts();                                               ///////// KEPT HERE FOR NOW, but should update card count when deck is init start of round
    }
    draw(cards) {                                                                   //draw x amount of cards and push into hand
        for (let i = 0; i < cards; i++) {
            if (this.hand.length >= 10 && this.deck.length !== 0) {                            //max hand size is 10 cards, if overdraw then send to discard pile
                this.discardPile.push(this.deck.pop())
                this.updateCounts()
            } else if (this.deck.length === 0) {
                this.discardPile.forEach((discard =>                                   //pushes every discarded card back into deck
                    this.deck.push(discard)
                ))
                this.discardPile.length = 0;                                            //clears the discard pile
                this.shuffle();             
                this.updateCounts();
                this.draw(1);                                                           
            }
            else {
                this.hand.push(this.deck.pop())
                this.updateCounts()
            }
        }
    }
    shuffle() {                                                                     //stole this code but made it work, returns the instance of a shuffled deck
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
        return this.deck;
    }
    discard(card) {                                                     //maybe also be a card method?                     

    }
    destroy(card) {                                                     //this should be a Card method?    
    }
    delete() {
        console.log('delete this card from deck permanently');
    }
    updateCounts() {
        deckCountEl.innerHTML = this.deck.length
        handCountEl.innerHTML = this.hand.length
        discardCountEl.innerHTML = this.discardPile.length
    }
}

class Card {
    constructor(name, cost, type, attributes) {
        this.name = name,
        this.cost = cost,
        this.type = type,                                       //attacks, tactics, specials
        this.attributes = attributes                            //{attack: x, block: x, thorns: x}
    }
    onHover() {
        console.log('Listener for mouse hover, enlarges card');
    }
    onClick() {
        console.log('Card attaches to cursor, waits for cursor release');
    }
    drawCard(card) {                                        //for cards that draw cards
        console.log('draw' + card + 'cards');
    }
    destroy() {                                             //typically destroyed when USED from hand
        console.log('card destroyed');
    }
}

//attacks
const Strike = new Card('strike', 1, 'attack', {damage: 3})
const Slash = new Card('slash', 2, 'attack', {damage: 7})

//defenses
const Guard = new Card('guard', 1, 'tactic', {block: 2})

//elementals
const FlameWave = new Card('flamewave', 2, 'attack', {damage: 2});
const Barrage = new Card('barrage', 2, 'attack', {damage: 2}) 
const BurningBlock = new Card('burningblock', 1, 'tactic', {thorns: 1, block: 1})

//characterSpec
const Track = new Card('track', 1, 'tactic')                                            //add card draw later
const DancingBlade = new Card('dancingblade', 2, 'attack', {damage: 2, block: 3})                          
const FireLotus = new Card('firelotus', 3, 'attack', {damage: 10})                               //add debuff to receive 1 less energy


const allCards = [Strike, Slash, Guard, FlameWave, Barrage, BurningBlock, Track, DancingBlade, FireLotus]

const doubleCards = allCards.concat(allCards);                                          //for current purposes, double # to create a bigger deck

const deckCountEl = document.querySelector('#deck-count');
const handCountEl = document.querySelector('#hand-count');
const discardCountEl = document.querySelector('#discard-count');

const yourDeck = new Deck;
doubleCards.forEach(card => {
    yourDeck.add(card)
});




