const currEnergyEl = document.querySelector('#current-energy');
const currHealthEl = document.querySelector('#current-health');
const maxHealthEl = document.querySelector('#max-health');

let gameOver = false;

function toggleGameOver() {
    setTimeout(() => {
        gameOver = !gameOver;
        gameOver = true ? alert('game over') : null
    }, 1250)
}

class Avatar {
    constructor(name, hp, maxhp) {
        this.name = name,
            this.hp = hp,
            this.maxhp = maxhp
    }
    fullHeal() {
        this.hp = this.maxhp
        currHealthEl.innerHTML = this.hp.toString();
    }
    modHealth(change) {
        if (Number.isInteger(change) != true) {
            throw new RangeError('change must be an integer');
        } else {
            if (this.hp + change > this.maxhp) {                                                    //if try to heal to above max, instead heal to full
                this.fullHeal();
                currHealthEl.innerHTML = this.hp.toString();
            } else if (this.hp + change <= 0) {
                this.hp = 0;
                currHealthEl.innerHTML = this.hp.toString();
                toggleGameOver();
            }
            else {
                this.hp += change;
                currHealthEl.innerHTML = this.hp.toString();
            }
        }
    }
    modMaxHealth(change) {
        if (Number.isInteger(change) != true) {                                         //ensure whole number
            throw new RangeError('change must be an integer, not a float')
        } else {
            this.maxhp += change;                                       //change maxHP to match argument
            maxHealthEl.innerHTML = this.maxhp.toString();              //change html                                   
            this.hp += change;                                        //modifies current HP to increase in same interval as max HP
            currHealthEl.innerHTML = this.hp.toString()
        }
    }

}

const baseChar = new Avatar('bob', 30, 30)
// console.log(baseChar);

