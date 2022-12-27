const rollBtn = document.querySelector('#roll-btn');
const rollGIF = document.querySelectorAll('.rolling-animation');            //returns an array
const elementImgHolder = document.querySelectorAll('.elementRoll');

rollBtn.addEventListener('click', () => {
    rollBtn.src = './assets/rollbtn-active.png';                                //click to change to active state
    playDiceRollSound();
    setTimeout(() => {
        rollBtn.src = './assets/rollbtn-inactive.png'                           //resets button position after 50ms
    }, 50)

    rollGIF.forEach(img => {                                                    //rolls x3 dice all at once
        img.classList.remove('inactive')
    })

    if (elementsRolled.length >= 1) {
        elementImgHolder.forEach(element => {
            element.src = ''                                                    //detects if theres any leftover elements, if so it will remove the source attribute
        });
        elementsRolled.length = 0;                                              //removes any existing elements
        return diceAnimationRemove();
    }
    else {
        return diceAnimationRemove();
    }
})

function diceAnimationRemove() {                                                //after 1s, remove GIF and getElement()
    setTimeout(() => {
        getElement();
        rollGIF.forEach(img => {
            img.classList.add('inactive')
        })
    }, 1000)
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

///////////
//Build Characters
///////////

// class Character {
//     constructor(name, HP, element) {
//         this.name = name,
//         this.HP = HP,
//         this.element = element
//     }
// }

// class Aang extends Character{
//     constructor(name, HP, element) {
//         super (name, HP, element)
//     }
//     draw() {
//         return console.log('Drawing cards!');
//     }
// }

// const Zuko = new Character('Zuko', 20, 'fire')
// const Player = new Aang ('Aang', 10, 'all')