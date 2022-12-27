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

//element can be a main element, 'all' (avatar), or 'none' (non-benders like Sokka)
//each deck has pre-determined set of cards, will add more card additions later