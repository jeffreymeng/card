import * as Util from '/util.js';


/**
 * Internal cards and decks
 * @type {Object}
 */
let Internal = {
    /**
     * Internal list of cards
     * @private
     * @type {Object}
     */
    cards: [],
    /**
     * Internal list of decks
     * @private
     * @type {Object}
     */
    decks: []
};


/**
 * @typedef {Number} Suit
 */

/**
 * Suit of a card
 * @enum {Suit}
 */
let SUIT = {
    CLUB: 1,
    DIAMOND: 2,
    HEART: 3,
    SPADE: 4
};


/**
 * Get string name of suit
 * @param  {Suit} suit Suit of the card
 * @return {String}    String name of the suit
 */
function getSuitName(suit) {
    switch (suit) {
        case SUIT.CLUB:
            return 'clubs';
        case SUIT.DIAMOND:
            return 'diamonds';
        case SUIT.HEART:
            return 'hearts';
        case SUIT.SPADE:
            return 'spades';
        default:
            Util.warn('getSuitName called with invalid suit ' + suit);
            return 'invalid suit';
    }
}



/**
 * One card
 */
class Card {
    /**
     * Makes a card
     * @param  {Card.SUIT}   [options.suit]     Suit of the card
     * @param  {Card.NUMBER} [options.number]   Number of the card
     * @param  {Number}      [options.location] Index of the deck card is in
     */
    constructor(options) {
        /**
         * Data of card
         * @type {Object}
         */
        this.options = options;
        this.suit = options.suit || SUIT.SPADE;
        this.number = options.number || 1;
        /**
         * Index of card in Internal card array
         * @private
         * @type {Number}
         */
        this.id = Internal.cards.length;
        /**
         * Id of deck this card is in
         * @private
         * @type {Number}
         */
        this.location = options.location || -1;

        Internal.cards.push(this); //add this to the internal card array
    }

    /**
     * Get string name of the card
     * @return {String} The name of the card
     */
    getString() {
        return `${this.number} of ${getSuitName(this.suit)}`;
    }

    /**
     * Add card to a deck
     * @param {Deck} deck Deck to add to
     */
    addTo(deck) {
        deck.__add(this.id);
        this.location = deck.id;
    }

    /**
     * Remove card from deck it's currently in
     * @throws {ReferenceError} Throws error if card hasn't been added to a deck
     */
    removeFromDeck() {
        if (this.location == -1) {
            throw new ReferenceError(`Card id ${this.id} has not been added to deck, so cannot be removed.`);
        } else {
            Internal.decks[this.location].__remove(this.id);
            this.location = -1;
        }
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
        /**
         * Ids of the cards in this deck
         * @readonly
         * @type {Card[]}
         */
        this.cards = [];
        /**
         * Index of deck in Internal deck array
         * @type {Number}
         */
        this.id = Internal.decks.length;

        Internal.decks.push(this);
    }

    /**
     * Adds a card to the deck by id
     * @private
     * @param {Number} id The Id of the card to add.
     */
    __add(id) {
        this.cards.push(id);
    }

    /** 
     * Adds one or more cards to the deck. Checks for duplicate cards before adding.
     * @param {...Card} cards Cards to add
     */
    add(...cards) {
        for (let card of cards) {
            if (!this.cards.includes(card.id)) {
                this.__add(card.id);
                Internal.cards[card.id].location = this.id;
            }
        }
    }

    /**
     * Removes a card from the deck by id
     * @private
     * @param  {Number} id Id of card to remove
     */
    __remove(id) {
        this.cards.splice(id, 1);
    }

    /**
     * Removes a card from the deck
     * @param  {...Card} cards Card or cards to be removed
     */
    remove(...cards) {
        for (let card of cards) {
            let i = this.cards.indexOf(card.id);
            if (i != -1) {
                this.__remove(i);
                Internal.cards[card.id].location = -1;
            }
        }
    }

    /**
     * Shuffle the deck randomly in place.
     */
    shuffle() {
        this.cards = Util.shuffle(this.cards);
    }

    // TODO: fix this
    // /**
    //  * Gets the card at the given index.
    //  * @readonly
    //  */
    // get cards() {
    //     return this.cards;
    // }
    // 
    // /**
    //  * Debug only
    //  * @param {Card[]} cards Cards to set card array to
    //  */
    // set cards(cards) {
    //     Util.warn(`Setting the cards of deck id ${this.id}`);
    //     this.cards = cards;
    // }

    /**
     * Sorts the deck. Default sort by ascending number with suits order club,
     * diamond, heart, spade
     * @param {Function} [compare] Compare function. Should accept 4 params,
     *                             suit and number of 1st card and suit and
     *                             number of second card. Return -1 to sort
     *                             first card before and 1 to sort card after.
     */
    sort(compare) {
        if (compare) {
            this.cards.sort((a, b) => {
                return compare(
                    this.cards[a].suit, this.cards[a].number,
                    this.cards[b].suit, thes.cards[b].number
                );
            });
        } else {
            this.cards.sort((a, b) => {
                let c1 = Internal.cards[a];
                let c2 = Internal.cards[b];

                if (c1.number < c2.number) {
                    return -1;
                } else if (c1.number > c2.number) {
                    return 1;
                } else {
                    if (c1.suit < c2.suit) {
                        return -1;
                    } else if (c1.suit > c2.suit) {
                        return 1;
                    } else {
                        Util.warn('Two completely identical cards found in sorting');
                        return 0;
                    }
                }
            });
        }
    }

    /**
     * Gets string of all cards for debugging
     * @return {String} String of all cards
     */
    getString() {
        let str = '';
        for (let id of this.cards) {
            str += Internal.cards[id].getString() + '\n';
        }

        return str;
    }
}


export {
    SUIT,
    getSuitName,
    Card,
    Deck,
    Internal
};