const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => {
    return operator === 'add' ? add(num1, num2)
        : operator === 'subtract' ? subtract(num1, num2)
            : operator === 'multiply' ? multiply(num1, num2)
                : operator === 'divide' ? divide(num1, num2)
                    : 'ERROR'
}

const calc = document.querySelector('.calculator');
calc.addEventListener('click', run);
const display = document.getElementById('display');
let num = '';
let num1 = 0;
let num2 = 0;
let operator = '';
const digitButtons = ['digit0', 'digit1', 'digit2', 'digit3', 'digit4', 'digit5', 'digit6', 'digit7', 'digit8', 'digit9'];
const operatorButtons = ['add', 'subtract', 'multiply', 'divide'];

function run(e) {
    let btn = e.target.id;
    if (btn === 'clear') {
        display.textContent = '0';
        num = '';
        num1 = 0;
        num2 = 0;
        operator = '';
    } else if (digitButtons.includes(btn)) {
        num += btn[btn.length - 1];
        display.textContent = num;
    } else if (operatorButtons.includes(btn)) {
        if (operator === '') {
            if (num !== '') {
                num1 = +num;
            } else num1 = 0;
            operator = btn;
            num = '';
        } else {
            num2 = +num;
            num = operate(operator, num1, num2);
            display.textContent = num;
            num1 = num;
            num = '';
            operator = btn;
        }
    } else if (btn === 'equal') {
        if (operator === '') {
        } else if (num !== '') {
            num2 = +num;
            num = operate(operator, num1, num2);
            display.textContent = num;
            num1 = num;
            num = '';
        } else {
            num = operate(operator, num1, num2);
            display.textContent = num;
            num1 = num;
            num = '';
        }
    }
}