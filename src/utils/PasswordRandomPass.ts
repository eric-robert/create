interface options {
    length?: number;
    prefix?: string;
    validCaracters?: string;
    mustHaveNumber?: boolean;
    mustHaveLowercase?: boolean;
    mustHaveUppercase?: boolean;
    mustHaveSpecial?: boolean;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=[]{}|;\':",./<>?`~';
const allSybols = alphabet + upperCase + numbers + symbols;

function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
}

function containsOneOf(str : string, arr : string) {
    return arr.split('').some(c => str.indexOf(c) > -1);
}

function setAt (pass : string, index : number, value : string) {
    return pass.substr(0, index) + value + pass.substr(index + 1);
}

export function CreateRandomPassword ( options : options ) {

    let length = options.length || 12;
    let prefix = options.prefix || '';

    let mustHaveNumber = options.mustHaveNumber;
    let mustHaveLowercase = options.mustHaveLowercase 
    let mustHaveUppercase = options.mustHaveUppercase
    let mustHaveSpecial = options.mustHaveSpecial

    let validCaracters = ""
        + (mustHaveNumber ? numbers : "")
        + (mustHaveLowercase ? alphabet : "")
        + (mustHaveUppercase ? upperCase : "")
        + (mustHaveSpecial ? symbols : "");


    if ( validCaracters.length == 0){
        return "password123";
    }
        
    if ( length < 8 ) 
        length = 8;

    let passwordItem = '';
    
    for (let j = 0; j < length; j++) {
        passwordItem += validCaracters[getRandomInt(validCaracters.length)];
    }

    let fail : boolean = true;
    let tried = 0;

    while ( fail && tried < 1000  ){

        fail = false;
        tried++;

        if (mustHaveNumber) {
            if (!containsOneOf(passwordItem, numbers)) {
                let numIndex = getRandomInt(numbers.length);
                let passIndex = getRandomInt(passwordItem.length);
                passwordItem = setAt(passwordItem, passIndex, numbers[numIndex]);
                fail = true;
            }
        }

        if (mustHaveLowercase) {
            if (!containsOneOf(passwordItem, alphabet)) {
                let lowerIndex = getRandomInt(alphabet.length);
                let passIndex = getRandomInt(passwordItem.length);
                passwordItem = setAt(passwordItem, passIndex, alphabet[lowerIndex]);
                fail = true;
            }
        }

        if (mustHaveUppercase) {
            if (!containsOneOf(passwordItem, upperCase)) {
                let upperIndex = getRandomInt(upperCase.length);
                let passIndex = getRandomInt(passwordItem.length);
                passwordItem = setAt(passwordItem, passIndex, upperCase[upperIndex]);
                fail = true;
            }
        }

        if (mustHaveSpecial) {
            if (!containsOneOf(passwordItem, symbols)) {
                let specialIndex = getRandomInt(symbols.length);
                let passIndex = getRandomInt(passwordItem.length);
                passwordItem = setAt(passwordItem, passIndex, symbols[specialIndex]);
                fail = true;
            }
        }

    }   

    return prefix + passwordItem
}