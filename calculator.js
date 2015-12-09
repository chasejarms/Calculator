

var clickableButtons = document.getElementsByClassName('button');
var screenDisplay = document.getElementById('screen-for-calc');  //this accesses calculator screen div
var historyContainer = document.getElementById('history-container'); //access the history-container div
var roundedSelection = document.getElementById('rounded-selection'); //access the user's rounded selection

function changeScreen(callingObject) {
    screenDisplay.style.visibility = "visible"; //fixes problem with screen position changing. Don't worry about it.
    if(screenDisplay.innerHTML === "Numbers") { //if the default text is there (Numbers), replace it with the user input
        screenDisplay.innerHTML = callingObject.childNodes[1].innerHTML; //change the screen display to match the clicked button's innerHTML
    }
    else {
        screenDisplay.innerHTML += callingObject.childNodes[1].innerHTML;
    }
}

function calculate() {
    if (roundedSelection.value === "whole-numbers") { //look at the value the user has selected (whole number in this case)
        var newScreen = round(eval(screenDisplay.innerHTML), 0); //round to that number
    }
    else if (roundedSelection.value === "tenths") {
        var newScreen = round(eval(screenDisplay.innerHTML), 1);
    }
    else if (roundedSelection.value === "hundredths") {
        var newScreen = round(eval(screenDisplay.innerHTML), 2);
    }
    else if (roundedSelection.value === "thousandths") {
        var newScreen = round(eval(screenDisplay.innerHTML), 3);
    }
    screenDisplay.innerHTML = newScreen; //display the rounded number on the screen
}

function clearScreen() {
    screenDisplay.innerHTML = "Numbers";
    screenDisplay.style.visibility = "hidden";
}

var differentiate = "0"; //differentiates ids for addHistory Buttons

function addHistory() {
    var historyButton = document.createElement('BUTTON');//create a button
    historyButton.innerHTML = screenDisplay.innerHTML; //add text to the button that is equal to the result of the function in the calculator
    historyButton.id = "history" + differentiate;//will give every historyButton a unique ID (see last line of code)
    historyButton.class = "history-buttons"
    var historyButtonId = historyButton.id;
    historyButton.addEventListener('click', function () {
        var numberHistory = document.getElementById(historyButtonId).innerHTML; //on button click, access text inside of button and store it in this variable
        if (screenDisplay.innerHTML === "Numbers") {
            screenDisplay.innerHTML = numberHistory; //if there's nothing on the screen, add the clicked button onclick
            screenDisplay.style.visibility = "visible"; // then make it visible
        }
        else {
            screenDisplay.innerHTML += numberHistory; //adds it to the end of the screen so that it can be used (already visible)
        }
    });//adds onclick event with the changeScreen function
    historyContainer.appendChild(historyButton);//add that button to the history div
    differentiate++;

}


function onEquals() {
    checkForBadDecimals();
    calculate();
    if (screenDisplay.innerHTML === "NaN") {
        screenDisplay.innerHTML = "Numbers";
        screenDisplay.style.visibility = "hidden";
        alert("Oops, it looks like the result is either not a number or is too long. Try again.");
    }
    else {
    addHistory();
    }
}

function round(value, toDecimals) {
    var roundedNumber = Number(Math.round(value + "e" + toDecimals) + "e-" + toDecimals); //take the value and change it to a certain number of decimal places
    return roundedNumber.toString();//turns the rounded value back into a string
}

function checkForBadDecimals() {
    var replaceDivideSymbol = screenDisplay.innerHTML.replace("/", "*"); //replaces dividers with another symbol (difficulty with regular expressions and forward slashes)
    var splitInputArray = replaceDivideSymbol.split(/[+*-]/);
    for (var x = 0; x < splitInputArray.length; x++) { //look at every spot of the array
        var decimalPoint = 0;
        var analyzeThisBit = splitInputArray[x];
        for (var x = 0; x < analyzeThisBit.length; x++) { //now look at every character in that spot of the array
            if (analyzeThisBit.charAt(x) === ".") { //if the character at the given index is a period, increment the counter
                decimalPoint++;
            }
            if (decimalPoint > 1) { //if there is more than one decimal point, don't allow the calculator to compute the function and let the user know there's a problem
                screenDisplay.innerHTML = "Numbers";
                screenDisplay.style.visibility = "hidden";
                alert("Oops, it looks like you put too many periods. Try again.");
                return;
            }
        }
    }
}
