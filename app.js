const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const nums = document.querySelectorAll('.num');
const backspace = document.querySelector('#backspace');
const clearCurrentNum = document.querySelector('#clearCurrentNum');
const clearAll = document.querySelector('#clearAll');
const operations = document.querySelectorAll('.operation');
const dot = document.querySelector('#dot');
const square = document.querySelector('#square');
const sqrt = document.querySelector('#sqrt');
const negative = document.querySelector('#negative');
const inverse = document.querySelector('#inverse');
const percent = document.querySelector('#percent');
const memCl = document.querySelector('#memCl');
const memRe = document.querySelector('#memRe');
const memPl = document.querySelector('#memPl');
const memMi = document.querySelector('#memMi');
const memSt = document.querySelector('#memSt');
const memLi = document.querySelector('#memLi');

let currentNum = parseFloat(display.textContent);
let storedNum = undefined;
let toDoOperation = '';
let isEqualActive = false;
let isCurrentNumWrote = false;
let isDot = false;
let blockClear = false;
let mainMemory = null;

let allMem = [];
const showMem = (mem) => {
    mem.forEach(m => {
        let li = document.createElement('li');
        li.textContent = m;
        memLi.appendChild(li);
    });
}
const memSwitch = () => {
    if(allMem.length != 0){
        memCl.disabled = false;
        memRe.disabled = false;
    }
    else{
        memCl.disabled = true;
        memRe.disabled = true;
    }
}

nums.forEach(num => {
    num.addEventListener('click', () => {
        if(isCurrentNumWrote === false || isEqualActive || blockClear){
            currentNum = 0;
            blockClear = false;
            isDot = false;
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
    if(isDot === false && (isCurrentNumWrote === false || String(currentNum).indexOf('.') < 1)){
        if(isCurrentNumWrote === false || isEqualActive || blockClear){
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
        blockClear = false;
    }
}); // Dotting :)
backspace.addEventListener('click', () => {
    if((isCurrentNumWrote || isEqualActive) && blockClear === false){
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
        if(currentNum === '' || currentNum === '-'){
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
            currentNum = storedNum;
            display.textContent = storedNum;
            isDot = false;
            isCurrentNumWrote = false;
            blockClear = false;
        }
    });
}); // Operations for addition, subtraction, multiplication, division
square.addEventListener('click', () => {
    currentNum *= currentNum;
    display.textContent = currentNum;
    if(isEqualActive){
        toDoOperation = '';
        storedNum = undefined;
    }
    blockClear = true;
    isDot = false;
    isCurrentNumWrote = false;
}); // Squaring
sqrt.addEventListener('click', () => {
    currentNum = Math.sqrt(currentNum);
    display.textContent = currentNum;
    if(isEqualActive){
        toDoOperation = '';
        storedNum = undefined;
    }
    blockClear = true;
    isDot = false;
    isCurrentNumWrote = false;
}); // Elementalization
percent.addEventListener('click', () => {
    currentNum /= 100;
    display.textContent = currentNum;
    if(isEqualActive){
        toDoOperation = '';
        storedNum = undefined;
    }
    blockClear = true;
    isDot = false;
    isCurrentNumWrote = false;
}); // Percents
inverse.addEventListener('click', () => {
    currentNum = 1 / currentNum;
    display.textContent = currentNum;
    if(isEqualActive){
        toDoOperation = '';
        storedNum = undefined;
    }
    blockClear = true;
    isDot = false;
    isCurrentNumWrote = false;
}); // Number inversing
negative.addEventListener('click', () => {
    currentNum -= 2 * currentNum;
    display.textContent = currentNum;
    if(isEqualActive){
        toDoOperation = '';
        storedNum = undefined;
    }
}); // Number negating
memSt.addEventListener('click', () => {
    mainMemory = currentNum;
    allMem.unshift(currentNum);
    memLi.innerHTML = '';
    showMem(allMem);
    memSwitch();
}); // Memory store
memCl.addEventListener('click', () => {
    mainMemory = null;
    allMem = [];
    memLi.innerHTML = '';
    showMem(allMem);
    memSwitch();
}); // Memory clear
memRe.addEventListener('click', () => {
    currentNum = mainMemory;
    display.textContent = currentNum;
    if(isEqualActive){
        toDoOperation = '';
        storedNum = undefined;
    }
    blockClear = true;
    isEqualActive = false;
    isCurrentNumWrote = true;
}); // Memory read
memPl.addEventListener('click', () => {
    mainMemory += currentNum;
    allMem[0] = mainMemory;
    memLi.innerHTML = '';
    showMem(allMem);
}); // Memory plus
memMi.addEventListener('click', () => {
    mainMemory -= currentNum;
    allMem[0] = mainMemory;
    memLi.innerHTML = '';
    showMem(allMem);
}); // Memory minus

//ATTENCION: ROUNDING NUMBERS SOMETIMES DOESNT WORK