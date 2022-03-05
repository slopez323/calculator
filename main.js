const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => {
    return operator === 'Add' ? add(num1, num2)
        : operator === 'Minus' ? subtract(num1, num2)
            : operator === 'Multiply' ? multiply(num1, num2)
                : operator === 'Slash' ? divide(num1, num2)
                    : 'ERROR'
}

const calc = document.querySelector('.calculator');
calc.addEventListener('click', run);
calc.addEventListener('click', transition);
calc.addEventListener('click', adjustFont);
window.addEventListener('keydown', run);
window.addEventListener('keydown', transition);
window.addEventListener('keydown', adjustFont);
const display = document.getElementById('display');
const displayText = document.getElementById('displayText');
const origFontSize = window.getComputedStyle(displayText, null).getPropertyValue('font-size');
let num = '';
let num1 = 0;
let num2 = 0;
let operator = '';
let continueCalc = false;
const digitButtons = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Period'];
const operatorButtons = ['Add', 'Minus', 'Multiply', 'Slash'];

function run(e) {
    let btn = e.target.id || e.code;
    if(event.shiftKey === true){
        if (btn === 'Equal'){
            btn = 'Add'
        } else if (btn === 'Digit8'){
            btn = 'Multiply'
        }
    }
    if (btn === 'clear' || btn === 'Escape') {
        displayText.textContent = '0';
        num = '';
        num1 = 0;
        num2 = 0;
        operator = '';
        displayText.style.fontSize = '';
    } else if (btn === 'Backspace') {
        num = num.substring(0, num.length - 1);
        if (num === '') {
            displayText.textContent = '0';
        } else displayText.textContent = num;
    } else if (digitButtons.includes(btn)) {
        if (btn === 'Period') {
            if (!num.includes('.')) {
                num += '.';
            }
        } else {
            num += btn[btn.length - 1];
        }
        displayText.textContent = num;
    } else if (operatorButtons.includes(btn)) {
        if (operator === '') {
            if (num !== '') {
                num1 = +num;
            } else num1 = 0;
            operator = btn;
            num = '';
        } else if (operator !== '' && continueCalc === true) {
            operator = btn;
            num = '';
            continueCalc = false;
        } else {
            num2 = +num;
            num = operate(operator, num1, num2);
            displayText.textContent = num;
            num1 = num;
            num = '';
            operator = btn;
        }
    } else if (btn === 'Equal' || btn === 'Enter') {
        if (operator === '') {
        } else if (num !== '') {
            num2 = +num;
            num = operate(operator, num1, num2);
            displayText.textContent = num;
            num1 = num;
            num = '';
            continueCalc = true;
        } else {
            num = operate(operator, num1, num2);
            displayText.textContent = num;
            num1 = num;
            num = '';
            continueCalc = true;
        }
    }
}

function transition(e) {
    let clicked = document.getElementById(e.target.id) || document.getElementById(e.code);
    if (!clicked) return;
    clicked.style.opacity = '0.5'
    clicked.addEventListener('transitionend', function () {
        clicked.style.opacity = ''
    })
}

function adjustFont() {
    if (displayText.clientWidth > display.clientWidth - 40) {
        while (displayText.clientWidth > display.clientWidth - 40) {
            let currentFontSize = window.getComputedStyle(displayText, null).getPropertyValue('font-size');
            displayText.style.fontSize = (parseInt(currentFontSize) - 1) + 'px';
        }
    } else if (displayText.style.fontSize !== '' && displayText.clientWidth < display.clientWidth - 40) {
        while (displayText.style.fontSize < origFontSize && displayText.clientWidth < display.clientWidth - 40){
            let currentFontSize = window.getComputedStyle(displayText, null).getPropertyValue('font-size');
            displayText.style.fontSize = (parseInt(currentFontSize) + 1) + 'px';
        }
    }
}


