
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
            this.die();
        }else {
        this.hp -= damage;
        // console.log(this);
        for(let i = 0; i <= enemyArray.length; i++) {
            if(enemyArray[i].id === this.id) {                      //why is this saying typeError id is not defined?
                getEnemyHPElement[i].innerHTML = this.hp;
                getEnemyHPBarElement[i].value = this.hp;
            }
        }
    }
    }
    heal() {
        console.log('heals a specific amount');
    }
    die() {
        for(let i = 0; i <= enemyArray.length; i++) {
            if (enemyArray[i].id === this.id) {
                enemyContainerEl.children[i].remove();
                enemyArray.splice(i, 1);
            }
        }
    }

}

const greenSlime = new Enemy('green-slime', 12, 12);
const redSlime = new Enemy('red-slime', 20, 20);

