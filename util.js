/**
 * Randomly shuffle an array using Fisher-Yates (https://stackoverflow.com/a/2450976/5511561)
 * @param  {Array} array Input array to be shuffled
 * @return {Array}       Shuffled array
 */
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
 * Merges 2 objects. If the same key exists for both, 2nd object
 * overwrites first one
 * @param  {Object} obj1 First object
 * @param  {Object} obj2 Second object
 */
function merge(obj1, obj2) {
    let obj3 = {};
    for (let attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (let attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}


/**
 * Warn the user using the console
 * @param  {String} msg Message to warn the user
 */
function warn(msg) {
    if (console.warn) {
        console.warn("Card.JS Warning: " + msg);
    } else {
        console.log("Card.JS Warning: " + msg);
    }
}


export {shuffle, merge, warn};