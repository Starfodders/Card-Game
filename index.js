const rollBtn = document.querySelector('#roll-btn');
const rollGIF = document.querySelector('.rolling-animation');
const elementImgHolder = document.querySelectorAll('.elementRoll');

rollBtn.addEventListener('click', () => {
    rollBtn.src = './assets/rollbtn-active.png';                                //click to change to active state
    setTimeout(() => {
        rollBtn.src = './assets/rollbtn-inactive.png'                           //resets button position after 50ms
    }, 50)
    rollGIF.classList.remove('inactive')

    if (elementsRolled.length >= 1) {
        elementImgHolder.forEach(element => {
            element.src = ''                                                    //detects if theres any leftover elements, if so it will remove the source attribute
        })
        diceAnimation();
    }
    else {
        diceAnimation();
    }
})

function diceAnimation() {
    setTimeout(() => {
        rollGIF.classList.add('inactive');                                      //hides dice roll
        getElement();                                                           //gets our three rolled elements
        playDiceRollSound();
    }, 1000)
}

//build a dice roller with each element as an index

const elementList = ['air', 'earth', 'fire', 'water'];      //array to hold the possible rolls
const elementsRolled = [];                                  //an array to hold the rolled elements

function getElement() {
    function diceRoll() {
        return Math.floor(Math.random() * 4)              //dice roller and returns value between 0 and 3
    }
    for (let i = 0; i <= 2; i++) {                                               //loops 3 times
        elementsRolled.push(elementList[diceRoll()])                            //pushes roll into the array
        elementImgHolder[i].src = `/assets/${elementsRolled[i]}.png`         //changes the src of the elementRoll to whatever index we dice rolled onto
    }
    return elementsRolled;
}

function playDiceRollSound() {                                                  //some audio for the dice roll
    const diceAudio = new Audio('./audio/diceroll.mp3');
    diceAudio.play();
}