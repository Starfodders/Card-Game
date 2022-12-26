var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('air-dice', 'assets/air-dice.png')
    this.load.image('fire-dice', 'assets/fire-dice.png')
    this.load.image('water-dice', 'assets/water-dice.png')
    this.load.image('earth-dice', 'assets/earth-dice.png')
    this.load.spritesheet('dice-all', 'assets/spritemap.png', {frameWidth: 64, frameHeight: 64})
}

function create() {
    this.add.image(400, 300, 'sky')
    this.add.image(650, 450, 'dice-all')
}

function update() {
}
