//Moving animation to happen
const calculator = document.querySelector('.calculator');
const container = document.querySelector('.animation-container');

//Popout items
const display = document.querySelector('.display');
const buttonHousing = document.querySelector('.button-housing');

//Moving animation event
container.addEventListener('mousemove', e => {
    let xAxis = (window.innerWidth / 2 - e.pageX) /15;
    let yAxis = (window.innerHeight / 2 - e.pageY) /15;
    calculator.style.transform = 'rotateY('+xAxis+'deg) rotateX('+yAxis+'deg)';
})

//Animate in
container.addEventListener('mouseenter', e => {
    calculator.style.transition = 'none';
    //Popout effect
    display.style.transform = 'translateZ(20px)';
    buttonHousing.style.transform = 'translateZ(20px)';
})

//Animate out
container.addEventListener('mouseleave', e => {
    calculator.style.transition = 'all 0.5s ease'
    calculator.style.transform = 'rotateY(0deg) rotateX(0deg)';
    //Popback effect
    display.style.transform = 'translateZ(0px)';
    buttonHousing.style.transform = 'translateZ(0px)';
})


//calculator functions
function operate(num1, operator, num2,) {
    switch(operator) {
        case '+':
            return Number(num1) + Number(num2)

        case '-':
            return Number(num1) - Number(num2)

        case 'x':
            return Number(num1) * Number(num2)

        case '/':
            return Number(num1) / Number(num2)

    }
}

document.querySelector('.button-housing').addEventListener('click', e => {
    switch(e.target.className) {
        case 'operator':
            document.querySelector('.upper-display').textContent += ' ' + e.target.textContent + ' ';
            break;
        
        case 'number':
            document.querySelector('.upper-display').textContent += e.target.textContent;
            break;
        
        case 'utility':
            switch(e.target.id) {
                case 'equal-key':
                    document.querySelector('.lower-display').textContent = evaluateExpression();
                    break;
                
                case 'clear-key':
                    document.querySelector('.upper-display').textContent = '';
                    document.querySelector('.lower-display').textContent = '';
                    break;
                
                case 'delete-key':
                    let originalString = document.querySelector('.upper-display').textContent;
                    let newString = originalString.slice(0, originalString.length - 1);
                    document.querySelector('.upper-display').textContent = newString;
                    break;
            }
            break;
    }
})

function evaluateExpression() {
    let input = document.querySelector('.upper-display').textContent;
    let inputArray = input.split(' ');
    
    while (inputArray.length != 1) {
        if (inputArray.indexOf('/') != -1) {
            let operatorIndex = inputArray.indexOf('/')
            let ans = operate(inputArray[operatorIndex-1], inputArray[operatorIndex], inputArray[operatorIndex+1]);
            inputArray.splice(operatorIndex-1, 3, ans);
        }
        else if (inputArray.indexOf('x') != -1) {
            let operatorIndex = inputArray.indexOf('x')
            let ans = operate(inputArray[operatorIndex-1], inputArray[operatorIndex], inputArray[operatorIndex+1]);
            inputArray.splice(operatorIndex-1, 3, ans);
        }
        else if (inputArray.indexOf('+') != -1) {
            let operatorIndex = inputArray.indexOf('+')
            //account for negative sign in front of numbers
            if (inputArray[operatorIndex-2] == '-') {
                let ans = operate(-(inputArray[operatorIndex-1]), inputArray[operatorIndex], inputArray[operatorIndex+1]);
                inputArray.splice(operatorIndex-1, 3, -(ans));
            }
            else {
                let ans = operate(inputArray[operatorIndex-1], inputArray[operatorIndex], inputArray[operatorIndex+1]);
                inputArray.splice(operatorIndex-1, 3, ans);
            }
        }
        else if (inputArray.indexOf('-') != -1) {
            let operatorIndex = inputArray.indexOf('-')
            //account for negative sign in front of numbers
            if (inputArray[operatorIndex-2] == '-') {
                let ans = operate(-(inputArray[operatorIndex-1]), inputArray[operatorIndex], inputArray[operatorIndex+1]);
                inputArray.splice(operatorIndex-1, 3, -(ans));
            }
            else {
                let ans = operate(inputArray[operatorIndex-1], inputArray[operatorIndex], inputArray[operatorIndex+1]);
                inputArray.splice(operatorIndex-1, 3, ans);
            }
        }
    }
    return inputArray[0];
}