
class Enemy {
    constructor(name, hp, hpmax) {
        this.name = name,
        this.hp = hp,
        this.hpmax =hpmax
        this.id = Enemy.counter++;
    }
    static counter = 0;                             
    attack() {
        console.log('attacks player');
    }
    defend() {
        console.log('gains defense value');
    }
    apply() {
        console.log('applies specific buff or debuff');
    }
    takeDamage(damage) {
        if (this.hp - damage <= 0) {
            this.hp -= damage;
            this.die();
        }else {
            this.hp -= damage;
            enemyHPBarElArray[0].value -= damage;
            enemyHPElArray[0].innerHTML -= damage;
            // getEnemyHPElement[0].innerHTML -= damage;
            // getEnemyHPBarElement[0].value -= damage;
    }}
    heal() {
        console.log('heals a specific amount');
    }
    die() {
        enemyContainerEl.children.item(0).remove();
        enemyArray.splice(0, 1)
        enemyHPBarElArray.shift();
        enemyHPElArray.shift();
    }

}

const greenSlime = new Enemy('green-slime', 5, 10);
const redSlime = new Enemy('red-slime', 20, 20);
const blueSlime = new Enemy('blue-slime', 30, 30);
