
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
            enemyArray.forEach((enemy) => {
                if (enemy.id === this.id) {
                    console.log(`Hitting ${enemy.name}`);
                    // getEnemyHPElement[enemy].innerHTML = this.hp;
                    // getEnemyHPBarElement[enemy].value = this.hp;                     //leave this for now, fix mouse drag
                }
            })
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
const blueSlime = new Enemy('blue-slime', 30, 30);
