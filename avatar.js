const currEnergyEl = document.querySelector('#current-energy');


let gameOver = false;

function toggleGameOver() {
    setTimeout(() => {
        gameOver = !gameOver;
        gameOver = true ? alert('game over') : null
    }, 1250)
}

function updateHPPlayerElements(avatar) {
    currHealthEl.innerHTML = avatar.hp.toString();
    healthBarEl.value = avatar.hp;
}

class Avatar {
    constructor(name, hp, maxhp) {
        this.name = name,
            this.hp = hp,
            this.maxhp = maxhp
            this.armour = 0;
    }
    fullHeal() {
        this.hp = this.maxhp
        currHealthEl.innerHTML = this.hp.toString();
        healthBarEl.value = this.maxhp;
    }
    modHealth(change) {
        let blockedDamage = 0;
        if (Number.isInteger(change) != true) {
            throw new RangeError('change must be an integer');
        } else {
            if (this.hp + change > this.maxhp) {                                                    //if try to heal to above max, instead heal to full
                this.fullHeal();
            } else if (this.hp + change <= 0) {
                this.hp = 0;
                this.armour = 0;
                updateHPPlayerElements(this)
                toggleGameOver();
            }
            else if (this.armour != 0 && change < 0) {                              //detects if change is damage
                blockedDamage = this.armour + change                                   //stores difference
                if (blockedDamage > 0) {                                            //if remainder is positive, keep armour
                    this.armour = blockedDamage;
                    playerArmourVal.innerHTML = blockedDamage;
                } else {
                    this.armour = 0;                                                                //if damage exceeds armour
                    this.hp += blockedDamage;
                    updateHPPlayerElements(this)
                    playerArmourVal.innerHTML = blockedDamage;
                    armourEl.classList.add('inactive')
                }
            }
            else {
                this.hp += change;
                updateHPPlayerElements(this)
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
            updatePlayerHPElements(this);
            healthBarEl.max = this.maxhp;
        }
    }
    modArmour(change) {
        if (Number.isInteger(change) != true || change < 0) {
            throw new RangeError('must be positive integer')
        } else {
            this.armour += change;
            playerArmourVal.innerHTML = this.armour;
            armourEl.classList.remove('inactive')
        }
    }
}

const baseChar = new Avatar('zuko', 30, 30)
const topIDName = document.querySelector('#top-id-name');
topIDName.innerHTML = baseChar.name.toString();
