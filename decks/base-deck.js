class Deck {
    constructor(name, element) {
        this.name = name,
        this.element = element
    }
    draw() {
        console.log('draw function');
    }
    shuffle() {
        console.log('shuffle function');
    }
}

class Card {
    constructor(name, element, cost, type, rarity = 'common') {
        this.name = name, 
        this.element = element,
        this.cost = cost,
        this.type = type
        this.rarity = rarity
    }
    use() {
        console.log('card is played, effect, then discarded');
    }
}

module.exports = {
    Deck,
    Card
};



//practice exporting modules

