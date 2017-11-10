//card.js
(function(window) {
	'use strict';

	function define() {
		/**
		 * Util functions, internal use only
		 * @type {Object}
		 */
		let Util = {
			/**
			 * Randomly shuffle an array using Fisher-Yates (https://stackoverflow.com/a/2450976/5511561)
			 * @param  {Array} array Input array to be shuffled
			 * @return {Array}       Shuffled array
			 */
			shuffle: array => {
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
			},
			/**
			 * Merges 2 objects. If the same key exists for both, 2nd object
			 * overwrites first one
			 * @param  {Object} obj1 First object
			 * @param  {Object} obj2 Second object
			 */
			merge: (obj1, obj2) => {
				let obj3 = {};
				for (let attrname in obj1) {
					obj3[attrname] = obj1[attrname];
				}
				for (let attrname in obj2) {
					obj3[attrname] = obj2[attrname];
				}
				return obj3;
			},
			/**
			 * Warn the user using the console
			 * @param  {String} msg Message to warn the user
			 */
			warn: msg => {
				if (console.warn) {
					console.warn("Card.JS Warning: " + msg);
				}
				else {
					console.log("Card.JS Warning: " + msg);
				}
			}
		};
		class CardJSException {
			constructor(msg) {
				this.message = msg;
			}
			toString() {
				return this.message;
			}
		}
		/**
		 * Internal list of cards and decks
		 * @type {Object}
		 */
		let cards = [];
		let decks = [];
		/**
		 * Card library
		 * @type {Object}
		 */
		let Card = {};
		//Card Constants
		Card.TYPE = {
			STANDARD: Symbol('standard'),
			POKER: Symbol('poker')
		};
		// Suit constants. This makes it much more intuitive to read.
		Card.SUIT = {
			CLUB: Symbol('club'),
			DIAMOND: Symbol('diamond'),
			HEART: Symbol('heart'),
			SPADE: Symbol('spade')
		};
		Card.Type = function(traits) {
			if (!(this instanceof Card.Type)) {
				Util.warn("You did not create an new instance of Card.Type when calling Card.Type(). " + "A new instance has been returned, but you should alter your source code. Refer " + "to the documentation for more information.");
				return new Card.Type(traits);
			}
			return [];
		};
		//Card constructor
		Card.Card = class {
			/*options:
				{
				    location:(null, deck),
				    type: (Card.type.standard)
				}
                
				*/
			/**
			 * Makes a new card
			 * TODO: @param  {Card} A card to clone.
			 * @param  {Object}  Options for the card
			 */
			//TODO: let users clone cards
			// Assuming that the user enters only a clone card, we return a card identical(except for the ID) to that card.
			// If the user enters options only, no clone, then we create a new card with the options.
			// If the user enters both, we clone the card except for the ID, then overwrite 
			constructor(clone, options) {
				//merge the defualt options with the user inputed options.

				Util.merge({
					location: null,
					type: Card.TYPE.STANDARD
				}, options);
				cards.push(this); //add this to the card array. Changes are reflected.
				this.cardId = cards.length - 1; //the index of the last element in the array.
				this.eventId = "C" + decks.length - 1;
			}
		};
		Card.Deck = class {

			constructor(options) {
				Util.merge({
					//todo
				}, options);
				this.cards = [];
				decks.push(this);
				this.cardId = decks.length - 1;
				this.eventId = "D" + decks.length - 1;
			}
			cardAt(index) {
				
			}
		}
		Card.getCardArr = () => {
			return cards;
		};
		Card.getDeckArr = () => {
			return decks;
		};


		return Card;
	}



	// define globally if it doesn't already exist
	if (typeof(Card) === 'undefined') {
		window.Card = define();
	}
	else {
		console.log("Card already defined.");
	}
})(window);