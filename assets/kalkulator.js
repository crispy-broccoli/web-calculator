//Create object to set default display
const defaultCondition = {
  displayDigit: '0',
  operator: null,
  firstDigit: null,
  waitingForSecondDigit: false,
};

//common calculator functions like update digits and clear digits
function updateDisplay() {
  document.querySelector('#displayDigit').innerText = defaultCondition.displayDigit;
}
 
function clearDisplay() {
  defaultCondition.displayDigit = '0';
  defaultCondition.operator = null;
  defaultCondition.firstDigit = null;
  defaultCondition.waitingForSecondDigit = false;
}

//make a function to add value to displayDigit of the defaultCondition object
function inputDigit(digit) {
  defaultCondition.displayDigit += digit;
}

//get the values of all button elements then add a click event to them
const buttons = document.querySelectorAll('.button');
for (const button of buttons) {
  button.addEventListener('click', function (event) {
    // get the clicked element object
    const target = event.target;
    
    //add functions to operators
    if (target.classList.contains('clear')) {
    clearDisplay();
    updateDisplay();
    return;
  }
    
    if (target.classList.contains('negative')) {
    inverseNumber();
    updateDisplay();
    return;
  }
 
  if (target.classList.contains('equals')) {
    performCalculation();
    updateDisplay();
    return;
  }
 
  if (target.classList.contains('operator')) {
    handleOperator(target.innerText);
    return;
  }
    
    inputDigit(target.innerText);
    updateDisplay();
  });
}

function inputDigit(digit) {
  if (defaultCondition.displayDigit === '0') {
    defaultCondition.displayDigit = digit;
  } else {
    defaultCondition.displayDigit += digit;
  }
}

function inverseNumber() {
  if (defaultCondition.displayDigit === '0') {
    return;
  }
  defaultCondition.displayDigit = defaultCondition.displayDigit * -1;
}

function handleOperator(operator) {
  if (!defaultCondition.waitingForSecondDigit) {
    defaultCondition.operator = operator;
    defaultCondition.waitingForSecondDigit = true;
    defaultCondition.firstDigit = defaultCondition.displayDigit;
 
    // Resetting the displayDigit value so the next button pressed will start over
    defaultCondition.displayDigit = '0';
  } else {
    alert('Operator has been set!');
  }
}

//lastly, create a function to perform calculation

function performCalculation() {
   if (calculator.firstNumber == null || calculator.operator == null) {
       alert("Anda belum menetapkan operator");
       return;
   }
 
   let result = 0;
   if (calculator.operator === "+") {
       result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
   } else {
       result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
   }
 
   // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
   const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
   }
   putHistory(history);
   calculator.displayNumber = result;
   renderHistory();
}