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
    reMake() {
        console.log('grab cards from discard pile, then call shuffle');
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
    constructor(name, cost) {
        this.name = name,
            this.cost = cost
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

class Attack extends Card {
    constructor(name, cost, damage) {
        super(name, cost),
            this.damage = damage
    }
    target() {
        console.log('Attack chosen target');
    }
    targetAll() {
        console.log('Attacks all targets');
    }
}

class Block extends Card {
    constructor(name, cost, block) {
        super(name, cost),
            this.block = block
    }
    thorns(dmg) {
        console.log('if thorns activated, deal' + dmg + 'to attacker');
    }
}

//attacks
const Strike = new Attack('strike', 1, 3)
const Slash = new Attack('slash', 2, 7)

//defenses
const Guard = new Block('guard', 1, 2)

//elementals
const FlameWave = new Attack('flamewave', 2, 2)
const Barrage = new Attack('barrage', 2, 1) //Barrage.targetAll()
const BurningBlock = new Block('burningblock', 1, 1)

//characterSpec
const Track = new Card('track', 1)              //add card draw later
const DancingBlade = new Attack('dancingblade', 2, 2)                          //should I add an instance of receiving defense method to this or rework it the class?
const FireLotus = new Attack('firelotus', 3, 10)                               //add debuff to receive 1 less energy


const allCards = [Strike, Slash, Guard, FlameWave, Barrage, BurningBlock, Track, DancingBlade, FireLotus]

const doubleCards = allCards.concat(allCards);                                          //for current purposes, double # to create a bigger deck

const deckCountEl = document.querySelector('#deck-count');
const handCountEl = document.querySelector('#hand-count');
const discardCountEl = document.querySelector('#discard-count');

const baseDeck = new Deck;
doubleCards.forEach(card => {
    baseDeck.add(card)
});




