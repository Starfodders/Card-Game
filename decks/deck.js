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
                playDrawSound();                 
                //draw 5 cards, only 3 cards left in deck
                //at instance 4, detect 0 cards so initiate reshuffle() and draw remaining
            }
            else {
                this.hand.push(this.deck.pop())
                createCardHTML(this.hand[i])
                this.updateCounts()
                playDrawSound();
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
    useCard(card) {                                                                             //implement specific card choices. YourDeck.useCard(yourDeck.hand[card])
        if (card.type === 'attack') {  
            console.log('deal damage');
            this.discardUsedCard(card)
            enemyArray[0].takeDamage(card.attributes.damage);                                       //since unable to read this 'id' from enemy class, won;t read past it
        } else if (card.type === 'tactic' && card.attributes.hasOwnProperty('damage') === true) {
            console.log('cause an effect and deal damage');
            this.discardUsedCard(card)

        } else {
            baseChar.modArmour(card.attributes.block)
            this.discardUsedCard(card)
        }
    }
    discardUsedCard(card) {
        this.discardPile.push(card);
        const whichCard = this.hand.findIndex(cards => cards.name === card.name)                //FOR NOW; removes card and element of matching card, need to remove based on mouse input
        handContainerEl.children[whichCard].remove();                                           //removes chosen child html element   
        this.hand.splice(whichCard,1);                                                          //removes card from hand array
        this.updateCounts();
    }
    discard(card) {                                                     //for cards tbat discard card
    }
    destroy(card) {                                                     //permanently deletion  
    }
    delete() {                                                              //probably duplication from above
        console.log('delete this card from deck permanently');
    }
    updateCounts() {
        deckCountEl.innerHTML = this.deck.length
        discardCountEl.innerHTML = this.discardPile.length
    }
}

class Card {
    constructor(name, cost, type, attributes) {
        this.name = name,
        this.cost = cost,
        this.type = type,                                       //attacks, tactics, specials
        this.attributes = attributes                           //{attack: x, block: x, thorns: x}
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
}

function playDrawSound() {
    const draw = new Audio('./audio/carddraw.mp3');
    draw.play();
}

//attacks
const Strike = new Card('strike', 1, 'attack', {damage: 3})
const Slash = new Card('slash', 2, 'attack', {damage: 7})

//defenses
const Block = new Card('block', 1, 'tactic', {block: 2})

//elementals
const FlameWave = new Card('flame-wave', 2, 'attack', {damage: 2});
const Barrage = new Card('barrage', 2, 'attack', {damage: 2}) 
const BurningBlock = new Card('burning-block', 1, 'tactic', {thorns: 1, block: 1})

//characterSpec
const Track = new Card('track', 1, 'tactic')                                            //add card draw later
const DancingBlade = new Card('dancing-blade', 2, 'attack', {damage: 2, block: 3})                          
const FireLotus = new Card('fire-lotus', 3, 'attack', {damage: 10})                               //add debuff to receive 1 less energy


const allCards = [Strike, Slash, Block, FlameWave, Barrage, BurningBlock, Track, DancingBlade, FireLotus]

const doubleCards = allCards.concat(allCards);                                          //for current purposes, double # to create a bigger deck

const deckCountEl = document.querySelector('#deck-count');
// const handCountEl = document.querySelector('#hand-count');
const discardCountEl = document.querySelector('#discard-count');

// const yourDeck = new Deck;
// doubleCards.forEach(card => {
//     yourDeck.add(card)
// });


const yourDeck = new Deck;

for (let i = 0; i <= 10; i++){
    yourDeck.add(Strike)
    yourDeck.add(Block)
}


