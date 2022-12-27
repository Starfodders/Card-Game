
const rollBtn = document.querySelector('#roll-btn');
const rollGIF = document.querySelector('.rolling-animation');
const elementRolled = document.querySelectorAll('.elementRoll');



rollBtn.addEventListener('click', () => {
    rollBtn.src = './assets/rollbtn-active.png';                                //click to change to active state
    setTimeout(() => {
        rollBtn.src = './assets/rollbtn-inactive.png'                           //resets button position
    }, 50) 

    rollGIF.classList.remove('inactive');                                       //reveals dice roll animation                                                              //calls fx to get 3 elements
    setTimeout(() => {
        rollGIF.classList.add('inactive');                                      //hides dice roll
        getElement();                                                           //gets our three rolled elements
    }, 1000)
   
})

//build a dice roller with each element as an index

const elementList = ['air', 'earth', 'fire', 'water'];      //array to hold the possible rolls

function getElement() {
    function diceRoll() {
        return Math.floor(Math.random()*4)              //dice roller and returns value between 0 and 3
    }
    for (let i = 0; i <=2; i++) {                                               //loops 3 times
        elementRolled[i].src = `/assets/${elementList[diceRoll()]}.png`         //changes the src of the elementRoll to whatever index we dice rolled onto
    }
}
