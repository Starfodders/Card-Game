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
            setTimeout(() => {
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
                    soundObj.playDrawSound();
                }
                else {
                    const drawnCard = this.deck.pop()
                    this.hand.push(drawnCard)
                    this.updateCounts()
                    createCardHTML(drawnCard)
                    soundObj.playDrawSound();
                }
            }, 250 * i)
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
    //pass card as well as index to remove it from hand array
    useCard(card, index) {
        if (card.cost - currEnergyEl.innerHTML > 0) {
            console.log('insufficient energy');
        } else {
            //different scenarios based on card type
            currEnergyEl.innerHTML -= card.cost;
            if (card.type === 'attack' && Object.entries(card.attributes).length === 1) {
                soundObj.playAttackSound();
                this.discardUsedCard(card, index)
                enemyArray[0].takeDamage(card.attributes.damage);
            } else if (card.type ==='attack' && Object.entries(card.attributes).length > 1) {
                soundObj.playAttackSound();
                statusElCreate(baseChar, card.attributes);
                this.discardUsedCard(card, index)
                enemyArray[0].takeDamage(card.attributes.damage);
            }
            else {
                const attrCheck = card.attributes;
                if (attrCheck.hasOwnProperty('power') || attrCheck.hasOwnProperty('thorns') || attrCheck.hasOwnProperty('fatigue')) {
                    statusElCreate(baseChar, attrCheck);
                    this.discardUsedCard(card, index)
                }
                else {
                    baseChar.modArmour(attrCheck.block)
                    soundObj.playGuardSound()
                    this.discardUsedCard(card, index)
                }
            }
            }
        }

    discardUsedCard(card, index) {
        this.discardPile.push(card);
        this.hand.splice(index, 1);                                                                       //removes card from hand array since push doesn't mutate
        this.updateCounts();
    }
    // discard(card) {                                                     //for cards tbat discard card
    // }
    destroy(card) {                                                     //permanently deletion 
        this.hand.splice(card, 1);
        this.destroyedCards.push(card);
        const whichCard = this.hand.findIndex(cards => cards.name === card.name)
        handContainerEl.children[whichCard].remove();
        destroyCountEl.innerHTML = this.destroyedCards.length;
        return this.hand;
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

const soundObj = {
    playDrawSound() {
        const draw = new Audio('./audio/carddraw.mp3');
        draw.play();
    },
    playAttackSound() {
        const atk = new Audio('./audio/attackSound.mp3');
        atk.play();
    },
    playGuardSound() {
        const block = new Audio('./audio/shield.mp3');
        block.play();
    },
    playPowerUpSound() {
        const buff = new Audio('./audio/powerUp.mp3');
        buff.play();
    }
}

function statusElCreate(target, effect) {
    //check if buff already exists
    const currentStatus = target.status;
    const newStatus = document.createElement('img');
    newStatus.className = 'status-effect';
    if (effect.hasOwnProperty('power')) {
        newStatus.src = './assets/status/atkUp.png'
        target.status.power = effect.power
        playerStatusBar.appendChild(newStatus)
        soundObj.playPowerUpSound();
    } else if (effect.hasOwnProperty('thorns') && effect.hasOwnProperty('block')) {             //if card has both properties
        newStatus.src = '/assets/status/thorns.png';
        playerStatusBar.appendChild(newStatus);
        target.status.thorns = effect.thorns;
        baseChar.modArmour(effect.block)
        soundObj.playGuardSound()
    } else if (effect.hasOwnProperty('fatigue')) {
        newStatus.src = './assets/status/fatigue.png';
        playerStatusBar.appendChild(newStatus);
        target.status.fatigue = effect.fatigue;
    }
}

//attacks
const Strike = new Card('strike', 1, 'attack', { damage: 3 })
const Slash = new Card('slash', 2, 'attack', { damage: 7 })

//defenses
const Block = new Card('block', 1, 'tactic', { block: 2 })

const Strength = new Card('strength', 2, 'tactic', { power: 1 })
const FireShield = new Card('fire-shield', 1, 'tactic', {block: 1, thorns: 1})
const FireLotus = new Card('fire-lotus', 3, 'attack', { damage: 10, fatigue: 1})                               //add debuff to receive 1 less energy

//elementals
const FlameWave = new Card('flame-wave', 2, 'attack', { damage: 2 });
const Barrage = new Card('barrage', 2, 'attack', { damage: 2 })

//characterSpec
const Track = new Card('track', 1, 'tactic')                                            //add card draw later
const DancingBlade = new Card('dancing-blade', 2, 'attack', { damage: 2, block: 3 })


const allCards = [Strike, Slash, Block, FlameWave, Barrage, Track, DancingBlade, FireLotus]

const doubleCards = allCards.concat(allCards);                                          //for current purposes, double # to create a bigger deck

const deckCountEl = document.querySelector('#deck-count');
const discardCountEl = document.querySelector('#discard-count');
const destroyCountEl = document.querySelector('#destroy-count');
const currEnergyEl = document.querySelector('#current-energy');


// const yourDeck = new Deck;
// doubleCards.forEach(card => {
//     yourDeck.add(card)
// });


const yourDeck = new Deck;

for (let i = 0; i <= 3; i++) {
    yourDeck.add(Strike)
    yourDeck.add(Block)
    yourDeck.add(Strength)
    yourDeck.add(FireShield)
    yourDeck.add(FireLotus)
}


