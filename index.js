const rollGIF = document.querySelectorAll('.rolling-animation');            //returns an array
const elementImgHolder = document.querySelectorAll('.elementRoll');
const drawButtonEl = document.querySelector('#draw-button');
const handContainerEl = document.querySelector('#hand-container');
const enemyContainerEl = document.querySelector('#enemy-container');
const playerContainerEl = document.querySelector('#player-container')
const turnStartEl = document.querySelector('#turn-start-btn')


function createCharacter(char) {
    const avatar = document.createElement('div');
    avatar.className = 'player-avatar'
    avatar.innerHTML = `<img src = './assets/Zuko01.gif' id='player-img' alt = 'player'/>
    <div class = 'health-values-container'>
        <label for ='health-bar'><span id ='avatar-hp'>${char.hp}</span>/<span id = 'avatar-max-hp'>${char.maxhp}</span></label>
        <progress id = 'health-bar' value = '${char.hp}' max = '${char.maxhp}'>${char.hp}</progress>
        <div class = 'armour-container inactive'>
            <div class = 'armour-value-container'>
                <span id = 'player-armour-val'>${char.armour}</span>
            </div>
            <div class = 'armour-background'>
            </div>
        </div>
    </div>
    <div id = 'player-mods'>
        <p>Status here</p>
    </div>`
    playerContainerEl.prepend(avatar)
}

function cardControl(card) {                                                              //animation
    let initialX;
    let initialY;                                                               //initial values to pass on
    let drag = false                                                           //default set to non-drag
    card.addEventListener('mouseover', () => {                                  //hover effect to show which card being considered
        card.style.transform = `translate(0, ${-50}px)`
    })
    card.addEventListener('mouseout', () => {                                //return to baseline
        card.style.removeProperty('transform')
    })
    card.addEventListener('mousedown', (e) => {                             //gets event values of card initial X,Y
        console.log('mouse is clicked');
        initialX = e.offsetX;
        initialY = e.offsetY;
        const initialMouseX = e.clientX;                                    //tracks your own cursor x,y
        const initialMouseY = e.clientY;

        document.body.addEventListener('mousemove', function moveMouse(e) {
            drag = true;
            const moveX = e.clientX - initialMouseX;                        //calculates difference of distance moved 
            const moveY = e.clientY - initialMouseY;

            card.style.left = `${initialX + moveX}px`                       //sets new position constantly, only works w/ non-static position
            card.style.top = `${initialY + moveY}px`
        })
    })
    card.addEventListener('mouseup', (e) => {
        // console.log(drag ? 'drag': 'click');
        // console.log(initialX);
        card.style.left = `${initialX}px`
        card.style.top = `${initialY}px`
    })
}

// function assignHPListener() {                                            this doesn't work
//     const getHPBars = document.querySelectorAll('progress');
//     for (let bar of getHPBars) {
//         bar.addEventListener('input', () => {
//             const currHP = bar.value;
//             const maxHP = bar.max;
//             const quotient = currHP / maxHP;
//             if (quotient <= 0.25) {
//                 bar.style.backgroundColor = 'red'
//             }
//         })
//     }
// }

function drawCardButtonEl() {
    drawButtonEl.addEventListener('click', () => {
        yourDeck.draw(1)                                                        //hard coded to refer to yourDeck
    })
}
function turnStartButtonEl() {
    turnStartEl.addEventListener('click', () => {
        turnStart();
    })
}

function createCardHTML(card) {
    function extractAttribute() {                                                           //not great solution, but allows me to display the attributes
        for (const att in card.attributes) {
            return `${att} : ${card.attributes[att]}`
        }
    }
    const descrip = extractAttribute();

    const nextCard = document.createElement('div');                                         //create new div element
    nextCard.className = `${card.type}`
    nextCard.innerHTML = `<div class = 'card-element-top'>
        <span class = 'name-block'>
            ${card.name}
        </span>
            </div>
        <img class = 'card-art-asset' src = './assets/Cards/${card.name}.png'/>
        <div class = 'card-description'>
            <p>${descrip}</p>
        </div>`
    if (handContainerEl.childElementCount <= 10) {                                                     //checks to make sure theres 10 or less cards in hand
        handContainerEl.prepend(nextCard);                                                              //add to hand container
        cardControl(nextCard)
        console.log(`Card drawn was ${card.name}`);
    } else {
        console.log('card was instead sent to discard pile');
    }
}

const enemyArray = [];                                                                      //each new enemy is added to array for easier selection;

function createEnemyHTML(enemy) {
    enemyArray.push(enemy);
    getEnemyIndex = enemyArray[enemyArray.length - 1];                                       //gets most recent addition to the array   
    const enemyGen = document.createElement('div');
    enemyGen.className = 'monster-placement';
    enemyGen.innerHTML = `<img src = './assets/Slime.gif' alt ='monster'/>
        <div class = 'enemy-hp-values-container'>
            <label for = 'enemy-${enemyArray.length}'>
            <span id = enemy-${enemyArray.length}-curr-hp>${enemy.hp}</span>/${enemy.hpmax}</label>
            <progress id = 'enemy-${enemyArray.length}-bar' value = '${enemy.hp}' max = '${enemy.hpmax}'>${enemy.hpmax}</progress>
        </div>
        <div class = 'enemy-mods-container'>
            <p>'status here'</p>
        </div>`
    enemyContainerEl.appendChild(enemyGen);
}

// function applyEnemyHPListener() {
//     const getHPElement = document.querySelectorAll('.enemy-hp-values-container label span');                //gets HP <span> elements
//     for (const el of getHPElement) {
//         el.addEventListener('input', () => {
//             console.log('change has registered');
//         })
//     }
// }


// applyEnemyHPListener();

///////////
//Get Element IMG
///////////


const elementList = ['air', 'earth', 'fire', 'water'];      //array to hold the possible rolls
const elementsRolled = [];                                  //an array to hold the rolled elements

function getElement() {
    function diceRoll() {
        return Math.floor(Math.random() * 4)              //dice roller and returns value between 0 and 3
    }
    for (let i = 0; i <= 2; i++) {                                               //loops 3 times
        elementsRolled.push(elementList[diceRoll()])                            //pushes roll into the array
        elementImgHolder[i].src = `/assets/${elementsRolled[i]}.png`                 //changes the src of the elementRoll to whatever index we dice rolled onto
    }
    console.log(elementsRolled);
    return elementsRolled;
}

function playDiceRollSound() {                                                  //some audio for the dice roll
    const diceAudio = new Audio('./audio/diceroll.mp3');
    diceAudio.play();
}
function diceAnimationRemove() {                                                //after 1s, remove GIF and getElement()
    setTimeout(() => {
        getElement();
        rollGIF.forEach(img => {
            img.classList.add('inactive')
        })
    }, 1000)
}

//////////
//control start of turn i.e. check affixes, energy regain, card draw
//////////

function turnStart(energy) {
    function updateEnergy(energy = 3) {
        if (energy < 0) {
            throw new RangeError('The energy value must be either greater than or equal to 0')
        } else {
            return currEnergyEl.innerHTML = energy
        }
    }
    function elementAnimation() {
        playDiceRollSound();
        rollGIF.forEach(img => {                                                    //displays x3 dice GIF at once
            img.classList.remove('inactive')
        })
        if (elementsRolled.length >= 1) {
            elementImgHolder.forEach(element => {
                element.src = ''                                                    //detects if theres any leftover elements src, if so it will remove the source attribute
            });
            elementsRolled.length = 0;                                              //removes any existing elements
            return diceAnimationRemove();
        }
        else {
            return diceAnimationRemove();
        }
    }
    yourDeck.shuffle();
    yourDeck.draw(5);
    updateEnergy(energy);
    elementAnimation();
}


function main() {
    drawCardButtonEl();
    turnStartButtonEl();

    createCharacter(baseChar)
    createEnemyHTML(greenSlime)
    createEnemyHTML(redSlime)
    createEnemyHTML(blueSlime)
    // assignHPListener();
}

main();
const healthBarEl = document.querySelector('#health-bar');
const currHealthEl = document.querySelector('#avatar-hp');
const maxHealthEl = document.querySelector('#avatar-max-hp');
const armourEl = document.querySelector('.armour-container');
const playerArmourVal = document.querySelector('#player-armour-val')
const getEnemyHPElement = document.querySelectorAll('.enemy-hp-values-container label span');                //gets HP <span> elements for enemies for targeting
const getEnemyHPBarElement = document.querySelectorAll('.enemy-hp-values-container progress')               //gets progress bar elements




