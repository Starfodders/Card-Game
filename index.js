const rollGIF = document.querySelectorAll('.rolling-animation');            //returns an array
const elementImgHolder = document.querySelectorAll('.elementRoll');
const drawButtonEl = document.querySelector('#draw-button');
const handContainerEl = document.querySelector('#hand-container');
const enemyContainerEl = document.querySelector('#enemy-container');
const playerContainerEl = document.querySelector('#player-container')
const characterContainerEl = document.querySelector('#characters-container')
const turnStartEl = document.querySelector('#turn-start-btn')
let sheet = document.styleSheets[0];


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
        <p></p>
    </div>`
    playerContainerEl.prepend(avatar);

}

function cardControl(cardHTML, card) {
    let seletedCard;
    let moveMouseListener;
    let moveMouseListenerUp;
    //hover effect and reset
    cardHTML.addEventListener('mouseover', () => {
        cardHTML.style.transform = `translate(0, ${-50}px)`
    })
    cardHTML.addEventListener('mouseout', () => {
        cardHTML.style.removeProperty('transform')
    })
    //click and drag effect
    cardHTML.addEventListener('mousedown', (e) => {                                             //gets event values of card initial X,Y
        selectedCard = e.target;
        let initialCardX = e.offsetX;                                                         //x, y towards card border (0,0 is top-left corner)
        let initialCardY = e.offsetY;
        const initialMouseX = e.clientX;                                                     //sets initial click based on viewport
        const initialMouseY = e.clientY;

        document.body.addEventListener('mousemove', moveMouseListener = function moveMouse(e) {
            const moveX = e.clientX - initialMouseX;
            const moveY = e.clientY - initialMouseY;
            cardHTML.style.left = `${initialCardX + moveX}px`
            cardHTML.style.top = `${initialCardY + moveY}px`
        })
        //determine if card is being used in active play area or in hand container
        document.body.addEventListener('mouseup', moveMouseListenerUp = function moveMouseUp(e) {
            {
                document.body.removeEventListener('mousemove', moveMouseListener);
                if (e.clientY > 500) {
                    cardHTML.style.left = 0;
                    cardHTML.style.top = 0;
                    document.body.removeEventListener('mouseup', moveMouseListenerUp)                   //after release, remove the listener too to prevent cycling
                } else {
                    console.log(card);
                    //(TO FIX: need to check card energy, not remaining energy)
                    if (currEnergyEl.innerHTML != 0 && currEnergyEl.innerHTML - card.cost >= 0) {
                        selectIndicator(selectedCard);
                        document.body.removeEventListener('mouseup', moveMouseListenerUp)
                    } else {
                        cardHTML.style.left = 0;
                        cardHTML.style.top = 0;
                        document.body.removeEventListener('mouseup', moveMouseListenerUp)
                    }
                }
            }
        }
        )
    })
    function selectIndicator(card) {
        //get the Index based on the HTML card selected
        function getCardIndex() {
            for (let i = 0; i < card.parentNode.children.length; i++) {
                if (card === card.parentNode.children.item(i)) {
                    return i
                }
            }
        }
        //render the picker, hide the card, and make picker follow your mouse
        const picker = document.createElement('div');
        picker.classList = 'chooser';
        picker.innerHTML = `<img src = './assets/UIAssets/cursor-xxl.png'>`;
        characterContainerEl.append(picker);
        card.style.display = 'none';
        //follows mouse position and updates HTML graphic
        document.body.addEventListener('mousemove', followMouse);
        followMouse();
        function followMouse(e) {
            let x, y;
            if (!e) {
                x = window.event.clientX;
                y = window.event.clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }

            picker.style.left = `${x}px`;
            picker.style.top = `${y}px`;
        }
        //functionality for left and right clicks. Left = use, Right = cancel 
        const pickerEl = document.querySelector('.chooser')
        picker.addEventListener('mousedown', (e) => {
            switch (e.button) {
                case 0:
                    let cardIndex = getCardIndex()
                    const pickedCard = yourDeck.hand[cardIndex];
                    yourDeck.useCard(pickedCard, cardIndex);
                    card.remove();                                                                              //removes HTML element
                    pickerEl.remove();
                    break;
                case 2:
                    pickerEl.remove();
                    card.style.removeProperty('display')
                    card.style.animation = 'card-return-anim 0.5s'
                    card.style.left = 0;
                    card.style.top = 0;
                    break;
                default:
                    console.log('unknown button');
            }
        })
    }
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

function createCardHTML(card) {
    //extract card uses and convert to usable string to be used in string literal
    function extractAttribute() {
        const attrArray = []
        for (const att in card.attributes) {
            const string = `${att.charAt(0).toUpperCase() + att.slice(1)} : ${card.attributes[att]}`
            attrArray.push(string)
        }
        return attrArray.toString()
    }
    //replace hyphen (-) with a space for card names
    function addSpace(string) {
        if (string.indexOf('-') != -1) {
            const arr = string.split('-')
            return arr.join(' ')
        }
        else {
            return string
        }
    }
    const descrip = extractAttribute();
    const cardName = addSpace(card.name)
    //create new div element skeleton
    const nextCard = document.createElement('div');
    nextCard.className = `${card.type}`
    nextCard.innerHTML = `<div class = 'card-element-top'>
        <span class = 'name-block'>
            ${cardName}
        </span>
            </div>
        <img class = 'card-art-asset' src = './assets/Cards/${card.name}.png'/>
        <div class = 'card-description'>
            <p>${descrip}</p>
        </div>`
    //checks for cards in hand, if over limit (10) then does not get added to HTMLCollection. If not, appends, apply functionality to it
    if (handContainerEl.childElementCount <= 10) {
        handContainerEl.appendChild(nextCard);
        cardAnim(nextCard)
        cardControl(nextCard, card)
    }
    function cardAnim(card) {
        card.style.animation = "card-draw-anim 0.5s"
    }
}

const enemyArray = [];                                                                      //each new enemy is added to array for easier selection;
function createEnemyHTML(enemy) {
    // const getEnemyIndex = enemyArray[enemyArray.length - 1];                                       //gets most recent addition to the array   
    const enemyGen = document.createElement('div');
    enemyGen.className = 'monster-placement';
    enemyGen.innerHTML = `<img src = './assets/Slime.gif' alt ='monster' id = enemy-${enemyArray.length}-img/>
        <div class = 'enemy-hp-values-container'>
            <label for = 'enemy-${enemyArray.length}'>
            <span id = enemy-${enemyArray.length}-curr-hp>${enemy.hp}</span>/${enemy.hpmax}</label>
            <progress id = 'enemy-${enemyArray.length}-bar' value = '${enemy.hp}' max = '${enemy.hpmax}'>${enemy.hpmax}</progress>
        </div>
        <div class = 'enemy-mods-container'>
            <p></p>
        </div>`
    enemyContainerEl.appendChild(enemyGen);
    enemyArray.push(enemy);

    enemyGen.addEventListener('mouseover', (e) => {
        if (document.body.querySelector(':has(.chooser)') != null) {
            // sheet.insertRule('.enemy-hp-values-container:hover::before {content: url("./assets/cursor-xxl.png"); position: absolute; display: inline; width: 30px; height: 30px;}')
            // getEnemyChoice(enemy.id)
        }
    })
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
        elementImgHolder[i].src = `/assets/UIAssets/${elementsRolled[i]}.png`                 //changes the src of the elementRoll to whatever index we dice rolled onto
    }
    // console.log(elementsRolled);
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

//////////
//control start of turn i.e. check affixes, energy regain, card draw
//////////

function turnStart(energy, draw = 3) {
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
    yourDeck.draw(draw);
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
const enemyHPElArray = Array.from(getEnemyHPElement);
const enemyHPBarElArray = Array.from(getEnemyHPBarElement);
const playerStatusBar = document.querySelector('#player-mods');



