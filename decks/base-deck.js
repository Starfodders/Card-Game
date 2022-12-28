class Deck {
    constructor() {
        this.deck = [];
    }
    add(card) {
        this.deck.push(card)
    }
    destroy(card) {
        console.log('destroys the card, removing it from current instance of play');
    }
    draw(cards) {
        console.log('draw x cards from top of deck');
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


module.exports = {
    Deck,
    Card,
    Attack,
    Block
};


// const DeckOne = new Deck(baseZuko)
// const baseZuko = [array of cards]