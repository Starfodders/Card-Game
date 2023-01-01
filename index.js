const rollGIF = document.querySelectorAll('.rolling-animation');            //returns an array
const elementImgHolder = document.querySelectorAll('.elementRoll');
const drawButtonEl = document.querySelector('#draw-button');
const handContainerEl = document.querySelector('#hand-container');
const enemyContainerEl = document.querySelector('#enemy-container');


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

        document.body.addEventListener('mousemove', function moveMouse(e){
            drag = true;
            const moveX = e.clientX - initialMouseX;                        //calculates difference of distance moved 
            const moveY = e.clientY - initialMouseY;

            card.style.left = `${initialX + moveX}px`                       //sets new position constantly, only works w/ non-static position
            card.style.top = `${initialY + moveY}px`
        })
    })
    card.addEventListener('mouseup', (e) => {
        // console.log(drag ? 'drag': 'click');
        console.log(initialX);
        card.style.left = `${initialX}px`
        card.style.top = `${initialY}px`
    })
}

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
        yourDeck.shuffle();
        yourDeck.draw(1)                                                        //hard coded to refer to yourDeck
        const detectDrawnCard = yourDeck.hand[yourDeck.hand.length -1]
        createCardHTML(detectDrawnCard);
    })
}

function createCardHTML(card) {     
    function extractAttribute() {                                                           //not great solution, but allows me to display the attributes
        for(const att in card.attributes) {
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
        <img class = 'card-art-asset' src = './assets/${card.name}.png'/>
        <div class = 'card-description'>
            <p>${descrip}</p>
        </div>` 
    handContainerEl.prepend(nextCard);                                                              //add to hand container
    cardControl(nextCard)
    console.log(`Card drawn was ${card.name}`);
}

const enemyArray = [];                                                                      //each new enemy is added to array for easier selection;

function createEnemyHTML(enemy) {
    enemyArray.push(enemy);  
    getEnemyIndex = enemyArray[enemyArray.length -1];                                       //gets most recent addition to the array   
    const enemyGen = document.createElement('div');
    enemyGen.className = 'monster-placement';
    enemyGen.innerHTML = `<img src = '' alt ='monster'/>
        <div class = 'enemy-status-bar'>
            <label for = 'enemy-${getEnemyIndex}'>HP: ${enemy.hp}</label>
            <progress id = 'enemy-${getEnemyIndex}' value = '${enemy.hp}' max = '${enemy.maxhp}'>${enemy.hp}</progress>
            <p>'status here'</p>
        </div>`
    enemyContainerEl.prepend(enemyGen);
    console.log(enemyGen);
}

drawCardButtonEl();
createEnemyHTML(greenSlime)



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


// try {
//     modHealth(-3);
// } catch (error) {
//     console.log('no', error);
// }

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


