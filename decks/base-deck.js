class Deck {
    constructor(deck) {
        this.deck = deck;
    }
    draw() {
        console.log('draw x cards from top of deck');
    }
    shuffle() {
        console.log('shuffle deck');
    }
    reMake() {
        console.log('grab cards from discard pile, then call shuffle');
    }
    delete() {
        console.log('delete this card from deck');
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
}


module.exports = {
    Deck,
    Card,
    Attack,
    Block
};


// const DeckOne = new Deck(baseZuko)
// const baseZuko = [array of cards]