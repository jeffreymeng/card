import * as Util from '/util.js';


/**
 * Internal list of cards and decks
 * @type {Object}
 */
let Internal = {
    cards: [], //to allow array to refrence card, cards are stored inside an internal array
    decks: []
};


//Card Constants
let TYPE = {
    STANDARD: Symbol('standard'),
    POKER: Symbol('poker')
};
// Suit constants. This makes it much more intuitive to read.
let SUIT = {
    CLUB: Symbol('club'),
    DIAMOND: Symbol('diamond'),
    HEART: Symbol('heart'),
    SPADE: Symbol('spade')
};
let NUMBER = {
    1: Symbol('1'),
    2: Symbol('2'),
    3: Symbol('3'),
    4: Symbol('4'),
    5: Symbol('5'),
    6: Symbol('6'),
    7: Symbol('7'),
    8: Symbol('8'),
    9: Symbol('9'),
    10: Symbol('10'),
    JACK: Symbol('jack'),
    QUEEN: Symbol('queen'),
    KING: Symbol('king'),
    JOKER: Symbol('joker'),
};


function getInternal() {
    return Internal;
}


/**
 * One card
 */
class Card {
   /**
    * Makes a card
    * @param  {Object}      options                           Options
    * @param  {Card.TYPE}   [options.type=Card.TYPE.standard] Type of card
    * @param  {Card.SUIT}   [options.suit]                    Suit of the card
    * @param  {Card.NUMBER} [options.number]                  Number of the card
    */
    constructor(options) {
        //merge the defualt options with the user inputed options.
        /**
         * Data of card
         * @type {Object}
         */
        this.options = Util.merge({ // merge with default array
            type: TYPE.STANDARD
        }, options);

        Internal.cards.push(this); //add this to the card array. Changes are reflected.
        /**
         * Index of card in Internal card array
         * @private
         * @type {Number}
         */
        this.internalID = Internal.cards.length - 1;
    }
    
    /**
     * Get string name of the card
     * @return {String} The name of the card
     */
    getString() {
        return `${this.options.number.toString().slice(7, -1)} of ${this.options.suit.toString().slice(7, -1)}`;
    }
}

/**
 * A deck of cards
 */
class Deck {
    /**
     * Makes a deck of cards. Basically an array of cards
     */
    constructor() {
        this.cards = [];
        this.internalID = Internal.decks.length - 1;
    }
    
    /**
     * Add card to deck
     * @param {Card} card Card to add
     */
    add(card) {
        this.cards.push(card);
    }
    
    /**
     * Removes a card from the deck. If more than one of the card,
     * it removes the first one
     * @param  {Card} card Card to be removed
     * @return {Card}      Card that was removed
     */
    remove(card) {
        const index = this.cards.find(card);
        
        if (index != -1) {
            return array.splice(index, 1);
        } else {
            Util.warn(card.getString() + ' is not in deck id ' + this.internalID);
            return null;
        }
    }
    
    /**
     * Shuffle the deck. Rearrange the order of the cards in place
     */
    shuffle() {
        this.cards = Util.shuffle(this.cards);
    }
    
    /**
     * Gets string of all cards
     * @return {String} String of all cards
     */
    getString() {
        let str = '';
        for (let card of this.cards) {
            str += card.getString() + '\n';
        }
        
        return str;
    }
}


export {TYPE, SUIT, NUMBER, getInternal, Card, Deck};
