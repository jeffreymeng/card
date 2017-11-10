
import * as Util from '/util.js';


/**
 * Internal list of cards
 * @type {Object}
 */
 let cards= [];
 /**
 * Internal list of decks
 * @type {Object}
 */
let decks = [];




// Suit constants. This makes it much more intuitive to read.
let SUIT = {
    CLUB: 1,//Symbol('club'),
    DIAMOND: 2,//Symbol('diamond'),
    HEART: 3,//Symbol('heart'),
    SPADE: 4//Symbol('spade')
};



function getCardArr() {
    return cards;
};
function getDeckArr() {
    return decks;
};

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
            
        }, options);

        cards.push(this); //add this to the card array. Changes are reflected.
        /**
         * Index of card in Internal card array
         * @private
         * @type {Number}
         */
        this.id = cards.length - 1;
    }
    
    /**
     * Get string name of the card
     * @return {String} The name of the card
     */
    getString() {
        return `${this.options.number.toString().slice(7, -1)} of ${this.options.suit.toString().slice(7, -1)}`;
    }
    
    addTo(deck) {
    	deck.__add(this.id);
    	this.location = deck.id;
    }
    removeFromDeck() {
    	
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
        this.id = decks.length - 1;
    }
    /**
     * Internal function used by Card constructor addTo function.
     * @param{int} id - the Id of the card to add.
     * Warning: Calling this function does not add a card to the deck while cross refrencing the location on the card. Use Deck.addCard() or Card.addTo()
     */
    
    __add(cardid) {
    	this.cards.push(cardid);
    }
    /** 
     * Add a card. This is the equivilant of calling .addTo on each given card.
     * @param{Card|Card[]...} Cards to add. 
     * Accepts an infinite number of parameters, which must be cards or arrays of cards. 
     * Note that you do not have to remove a card from a deck before adding it. It is done automatically.
     */
     //not sure if above jsdoc is valid
    addCard() {
    	
    	for (let i =0;i < arguments.length; i ++) {
    		if (Array.isArray(arguments[i] )) {
    			for (let ai = 0; ai < arguments[i].length; ai ++) {
    				//add each card inside the array
    				arguments[i][ai].addTo(this);
    			}
    		} else {
    			//add the cards
    			arguments[i].addTo(this);
    		}
    	}
    }
    /**
     * Shuffle the deck. Rearrange the order of the cards in place
     * @param {int} times The number of times to shuffle
     */
    shuffle(times) {
    	for (let i = 0; i < times; i ++) {
        this.cards = Util.shuffle(this.cards);
    	}
    }
    
    /**
     * Gets string of all cards
     * @return {String} String of all cards
     * For debugging
     */
    getString() {
        let str = '';
        for (let card of this.cards) {
            str += card.getString() + '\n';
        }
        
        return str;
    }
}


export { SUIT, getCardArr, getDeckArr, Card, Deck};
