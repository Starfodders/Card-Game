const rollBtn = document.querySelector('#roll-btn');
const rollGIF = document.querySelectorAll('.rolling-animation');            //returns an array
const elementImgHolder = document.querySelectorAll('.elementRoll');
const drawButtonEl = document.querySelector('#draw-button');
const handContainerEl = document.querySelector('#hand-container');
const currEnergyEl = document.querySelector('#current-energy');
const currHealthEl = document.querySelector('#current-health');
const maxHealthEl = document.querySelector('#max-health');



function diceAnimationRemove() {                                                //after 1s, remove GIF and getElement()
    setTimeout(() => {
        getElement();
        rollGIF.forEach(img => {
            img.classList.add('inactive')
        })
    }, 1000)
}

function drawCardButtonEl() {
    drawButtonEl.addEventListener('click', () => {
        yourDeck.draw(1)                                                        //hard coded to refer to yourDeck
        createCardHTML();
    })
}

function createCardHTML() {
    const currentCardEl = yourDeck.hand[yourDeck.hand.length - 1];                        //selector for current drawn card
    const nextCard = document.createElement('div');                                         //create new div element
    nextCard.innerHTML = `<div class = ${currentCardEl.type}><h1>${currentCardEl.name}</h1><p>'This card does this'</p></div>`           //update contents with drawn card info
    handContainerEl.appendChild(nextCard);                                                              //add to hand container
    console.loçg(`Card drawn was ${yourDeck.hand[yourDeck.hand.length - 1].name}`)
}



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

/////////////
///// mods to stats
/////////////

function modHealth(change = null, full = false) {
    if (full === true) {                                                    //if full heal is applied, set to true and will equalize the HP to full
        change = parseInt(maxHealthEl.innerHTML)
    } else {
        let HPint = parseInt(currHealthEl.innerHTML);                       //change hp to integer, accepts + and - to HP
        HPint += change;
        let newHP = HPint.toString();
        currHealthEl.innerHTML = newHP;
    }
}

function modMaxHealth(change) {
    let HPint = parseInt(maxHealthEl.innerHTML);                       //change hp to integer, accepts + and - to HP
    HPint += change;
    let newHP = HPint.toString();
    maxHealthEl.innerHTML = newHP;
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
    yourDeck.draw(5);
    updateEnergy(energy);
    elementAnimation();
}


