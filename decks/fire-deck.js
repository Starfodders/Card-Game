const base = require('./base-deck')
const {Deck, Card, Attack, Block} = base;                  //extracts the classes from base

const Strike = new Attack('strike', 1, 3)
const Slash = new Attack('slash', 2, 7)

const Guard = new Block('guard', 1, 2)

const FlameWave = new Attack('flamewave', 2, 2)