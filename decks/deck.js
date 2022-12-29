class Deck {
    constructor() {
        this.deck = [];
        this.hand = [];
        this.destroyedCards = [];
        this.discardPile = [];
    }
    add(card) {
        this.deck.push(card)
    }
    destroy(card) {                                                     //this should be a Card method?    
    }
    draw(cards) {                                                                   //draw x amount of cards and push into hand
        for (let i = 0; i < cards; i++) {
            this.hand.push(this.deck.pop())
        }             
    }
    shuffle() {                                                                     //stole this code but made it work, returns the instance of a shuffled deck
        for (let i = this.deck.length - 1; i > 0; i--) {     
            let j = Math.floor(Math.random() * i);          
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
            return this.deck;
        }
        return this.deck;
    }
    reMake() {
        console.log('grab cards from discard pile, then call shuffle');
    }
    delete() {
        console.log('delete this card from deck permanently');
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
const DancingBlade = new Attack ('dancingblade', 2, 2)                          //should I add an instance of receiving defense method to this or rework it the class?
const FireLotus = new Attack ('firelotus', 3, 10)                               //add debuff to receive 1 less energy


const allCards = [Strike, Slash, Guard, FlameWave, Barrage, BurningBlock, Track, DancingBlade, FireLotus]
const deckCountEl = document.querySelector('#deck-count');

const baseDeck = new Deck;
allCards.forEach(card => {
    baseDeck.add(card)
});

deckCountEl.innerHTML = baseDeck.deck.length



