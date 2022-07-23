import {words} from './words';

const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=[]{}|;\':",./<>?`~';

interface options {
    words?: number;
    mergeWith?: string;
    replaceWithNumbers?: boolean,
    replaceWithSymbols?: boolean,
    replaceWithUppercase?: boolean,
}

function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
}

function randomWord() {
    return words[getRandomInt(words.length)];
}

function setAt (pass : string, index : number, value : string) {
    return pass.substr(0, index) + value + pass.substr(index + 1);
}

const numberRepalcement = {
    'o': '0',
    'i': '1',
    'l': '1',
    's': '5',
    'z': '2',
    'e': '3',
    'a': '4',
    'g': '6',
    't': '7',
    'b': '8',
    'r': '9',
} as any

const symbolReplacement = {
    'i': '!',
    'a': '@',
    's': '$',
    'e': '%',
    'l': '|',
    'o': '*',
    't': '+',
    'h': '#'
} as any


export function CreateDictPassword ( options : options ) {

    let words = options.words || 4;
    let mergeWith = options.mergeWith;
    let replaceWithNumbers = options.replaceWithNumbers || 0;
    let replaceWithSymbols = options.replaceWithSymbols || 0;
    let replaceWithUppercase = options.replaceWithUppercase || 0;

    if (mergeWith == 'none') mergeWith = '';
    if (mergeWith == 'dashes') mergeWith = '-';
    if (mergeWith == 'underscores') mergeWith = '_';
    if (mergeWith == 'dots') mergeWith = '.';

    let parts = [];

    for (let i = 0; i < words; i++) {
        parts.push(randomWord());
    }

    let password = parts.join(mergeWith);
    
    console.log(password)

    if ( replaceWithNumbers ){
        for ( let i = 0; i < password.length; i++ ){
            if ( getRandomInt(5) === 1 ){
                let char = password[i];
                let replace = numberRepalcement[char];
                if ( replace ){
                    password = setAt(password, i, replace);
                }
            }
        }
    }

    if ( replaceWithSymbols ){
        for ( let i = 0; i < password.length; i++ ){
            if ( getRandomInt(5) === 1 ){
                let char = password[i];
                let replace = symbolReplacement[char];
                if ( replace ){
                    password = setAt(password, i, replace);
                }
            }
        }
    }

    if ( replaceWithUppercase ){
        for ( let i = 0; i < password.length; i++ ){
            if ( getRandomInt(5) === 1 ){
                let char = password[i];
                let replace = char.toUpperCase()
                if ( replace ){
                    password = setAt(password, i, replace);
                }
            }
        }
    }

    return password
}