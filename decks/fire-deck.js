const base = require('./base-deck')
const {Deck, Card, Attack, Block} = base;                  //extracts the classes from base

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

const baseDeck = new Deck;
allCards.forEach(card => {
    baseDeck.add(card)
});

