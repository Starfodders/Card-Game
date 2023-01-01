class Enemy {
    constructor(name, hp, hpmax) {
        this.name = name,
        this.hp = hp,
        this.hpmax =hpmax
    }
    attack() {
        console.log('attacks player');
    }
    defend() {
        console.log('gains defense value');
    }
    apply() {
        console.log('applies specific buff or debuff');
    }
    heal() {
        console.log('heals a specific amount');
    }
    die() {
        console.log('element is removed from play');
    }
}

const greenSlime = new Enemy('green-slime', 12, 12);
