const base = require('./base-deck')
const {Deck, Card} = base;                  //extracts the classes from base
// console.log(Card);

const firePunch = new Card ('fire punch','fire', 1, 'attack')
console.log(firePunch);

const fireWave = new Card('fire wave', 'fire', 2, 'attack')