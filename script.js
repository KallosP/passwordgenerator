/*
    TODO: 
        
*/

function main(passLength){

    var passLength = document.getElementById("passLength").value;

    if(isNum(passLength)){

        let newPassword = generatePassword(passLength);
        document.getElementById("newPassword").innerHTML = newPassword;

    }
    
}

//Copies password to clipboard
function copyPassword(){

    var password = document.getElementById("newPassword")
    navigator.clipboard.writeText(password.value)

}

//Ensures that input is entered, is a number, is greater than 0, and is <= 100
function isNum(passLength){

    if (isNaN(passLength) || passLength == "" || passLength <= 0) {
        alert("Must input numbers larger than zero");
        return false;
    }
    else if(passLength > 100){
        alert("Password too large")
    }
    else {
        return true;
    }

}

function generatePassword(passLength){
    let password = "";
    let randChar = "";
    
    for(let i = 0; i < passLength; ++i) {
        
        //If no box was checked
        if(generateRandChar() == -1){
            alert("Must include at least one option")
            break;
        }

        randChar = generateRandChar();
        password += randChar;
        
    }
        
    return password;
}

function generateRandChar() {
		
    let randNum = generateRandAsciiInRange();
    if(randNum == -1){
        return -1;
    }
    //Converts ASCII value to character. ASCII range that is used is from 33-122 (excluding 58-64 and 91-96).
    //"code", aka '!', is the starting point of the range. The randNum generated 
    //is any number from 0-89 (excluding 25-31 and 58-63). This is b/c 0 + 33 = 33 and 89 + 33 = 122, which 
    //only allows characters with ASCII values from 33-122 (without the exceptions mentioned previously) to be generated.
    const code = '!'.charCodeAt(0);
    let c = String.fromCharCode(randNum + code);
    return c; 
        
}

//Builds and returns an array with a new lowest and highest value if necessary
//The array holds the possible ranges
function buildArray(array, range){

    array.splice(0, 0, range)

    return array;
}

//Returns an ASCII value in a specified range. Returns -1 if no range was specified
function generateRandAsciiInRange() {
		
    //Holds possible ranges for ASCII characters via arrays 
    let desiredRange = [];

    //If box 1 is checked, include it's corresponding range
    var type1 = document.getElementById('type1');
    if(type1.checked){
        //Include 64-89
        let lowerCaseRange = [64, 89]
        desiredRange = buildArray(desiredRange, lowerCaseRange);
    }

    //If box 2 is checked...
    var type2 = document.getElementById("type2");
    if(type2.checked){
        //Include 32-57
        let upperCaseRange = [32, 57]
        desiredRange = buildArray(desiredRange, upperCaseRange);
    }

    //If box 3 is checked...
    var type3 = document.getElementById("type3");
    if(type3.checked){
        //Include 15-24
        let numberRange = [15, 24]
        desiredRange = buildArray(desiredRange, numberRange);
    }

    //If box 4 is checked...
    var type4 = document.getElementById("type4");
    if(type4.checked){
        //Include 0-14
        let specialRange = [0, 14]
        desiredRange = buildArray(desiredRange, specialRange);
    }

    //If no box checked, return -1
    if(desiredRange.length == 0) { return -1; }

    //Separates each array in desiredRange into their own variables (if less than 4, then some variables will be undefined)
    //NOTE: Each range variable can hold different ranges with each iteration. It depends on which box(es) are selected/the 
    //      amount of box(es) that are selected. Some variables might not even be assigned and will be undefined.
    var range1 = desiredRange.at(0);
    var range2 = desiredRange.at(1);
    var range3 = desiredRange.at(2);
    var range4 = desiredRange.at(3);

    //Loops until a character within the selected range is generated
    while(true) {

        //Generates random number by adding Math.random()
        let x = parseInt((Math.random() * 100));

        //First if statement checks for number of ranges. Nested if statement checks if x is in the correct range(s).
        if(desiredRange.length == 1) {

            if( x >= range1.at(0) && x <= range1.at(1) )
                return x;

        }
        else if(desiredRange.length == 2){

            if( (x >= range1.at(0) && x <= range1.at(1)) || (x >= range2.at(0) && x <= range2.at(1)) )
                return x;

        }
        else if(desiredRange.length == 3){

            if( (x >= range1.at(0) && x <= range1.at(1)) || (x >= range2.at(0) && x <= range2.at(1)) 
                || (x >= range3.at(0) && x <= range3.at(1)) ) 
                return x;

        }
        else if(desiredRange.length == 4){

            if( (x >= range1.at(0) && x <= range1.at(1)) || (x >= range2.at(0) && x <= range2.at(1)) 
                || (x >= range3.at(0) && x <= range3.at(1)) || (x >= range4.at(0) && x <= range4.at(1)) ) 
                return x;

        }
    }
    
}