const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const nums = document.querySelectorAll('.num');
const backspace = document.querySelector('#backspace');
const clearCurrentNum = document.querySelector('#clearCurrentNum');
const clearAll = document.querySelector('#clearAll');
const operations = document.querySelectorAll('.operation');
const dot = document.querySelector('#dot');
let currentNum = parseFloat(display.textContent);
let storedNum = undefined;
let toDoOperation = '';
let isEqualActive = false;
let isCurrentNumWrote = false;
let isDot = false;

nums.forEach(num => {
    num.addEventListener('click', () => {
        if(isCurrentNumWrote === false || isEqualActive){
            currentNum = 0;
        }
        if(isEqualActive){
            toDoOperation = '';
            storedNum = undefined;
        }
        if(display.textContent === 'Do not divide by zero'){
            buttons.forEach(button => {
                button.disabled = false;
            });
        }
        if(currentNum < 100000000000000){
            if(isDot){
                currentNum = String(currentNum) + String(num.textContent);
            }
            else{
                currentNum = parseFloat(currentNum) * 10 + parseFloat(num.textContent);
            }
            display.textContent = currentNum;
        }
        isEqualActive = false;
        isCurrentNumWrote = true;
    });
}); // Writing current number on display
dot.addEventListener('click', () => { 
    if(isDot === false){
        if(isCurrentNumWrote === false || isEqualActive){
            currentNum = 0;
        }
        if(isEqualActive){
            toDoOperation = '';
            storedNum = undefined;
        }
        if(currentNum < 100000000000000){
            currentNum = String(currentNum) + '.';
            display.textContent = currentNum;
            isDot = true;
        }
        isEqualActive = false;
        isCurrentNumWrote = true;
    }
}); // Dotting :)
backspace.addEventListener('click', () => {
    if(isCurrentNumWrote || isEqualActive){
        if(display.textContent === 'Do not divide by zero'){
            buttons.forEach(button => {
                button.disabled = false;
            });
        }
        if(String(currentNum)[String(currentNum).length - 1] === '.'){
            isDot = false;
        }
        currentNum = String(currentNum).substring(0, String(currentNum).length - 1);
        if(isEqualActive){
            toDoOperation = '';
            storedNum = undefined;
            currentNum = 0;
        }
        if(currentNum == ''){
            currentNum = 0;
        } // If current number is empty show on display 0
        display.textContent = currentNum;
    }
}); // Deleting last writed number
clearCurrentNum.addEventListener('click', () => {
    if(display.textContent === 'Do not divide by zero'){
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
    if(isEqualActive){
        toDoOperation = '';
        storedNum = undefined;
    }
    isDot = false;
    currentNum = 0;
    display.textContent = currentNum;
}); // Reseting current number
clearAll.addEventListener('click', () => {
    if(display.textContent === 'Do not divide by zero'){
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
    isDot = false;
    toDoOperation = '';
    storedNum = undefined;
    currentNum = 0;
    display.textContent = currentNum;
}); // Reseting whole calculator
operations.forEach(operation => {
    operation.addEventListener('click', () => {
        if(String(currentNum)[String(currentNum).length - 1] === '.'){
            currentNum = String(currentNum).substring(0, String(currentNum).length - 1);
        }
        currentNum = parseFloat(currentNum);
        if(toDoOperation === '/' && currentNum === 0){
            toDoOperation = '';
            isEqualActive = true;
            buttons.forEach(button => {
                button.disabled = true;
            });
            nums.forEach(num => {
                num.disabled = false;
            });
            clearCurrentNum.disabled = false;
            clearAll.disabled = false;
            backspace.disabled = false;
            for(op of operations){
                if(op.textContent === '='){
                    op.disabled = false;
                }
            }
            display.textContent = 'Do not divide by zero';
        }
        else{
            isEqualActive = false;
            if(toDoOperation !== '' && storedNum !== undefined && (isCurrentNumWrote || operation.textContent === '=')){
                switch(toDoOperation){
                    case '/': storedNum /= currentNum;
                    break;
                    case 'X': storedNum *= currentNum;
                    break;
                    case '-': storedNum -= currentNum;
                    break;
                    case '+': storedNum += currentNum;
                }
            }
            else if(toDoOperation === '' && storedNum === undefined){
                storedNum = currentNum;
            }
            switch(operation.textContent){
                case '/': toDoOperation = '/';
                break;
                case 'X': toDoOperation = 'X';
                break;
                case '-': toDoOperation = '-';
                break;
                case '+': toDoOperation = '+';
                break;
                case '=': {
                    isEqualActive = true;
                    if(display.textContent === 'Do not divide by zero'){
                        toDoOperation = '';
                        storedNum = 0;
                        currentNum = 0;
                        buttons.forEach(button => {
                            button.disabled = false;
                        });
                    }
                }
            }
            if(operation.textContent !== '='){
                currentNum = storedNum;
            }
            isDot = false;
            display.textContent = storedNum; 
            isCurrentNumWrote = false;
        }
    });
}); // Operations for addition, subtraction, multiplication, division

//ATTENCION: ROUNDING NUMBERS SOMETIMES DOESNT WORK