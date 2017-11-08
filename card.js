//card.js
(function(window) {
    'use strict';

    function define() {

        var Card = {};
        // utils
        //https://stackoverflow.com/a/2450976/5511561
        var shuffle = function(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

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
        };
        
        //merges an object. It takes obj1, a defualt object, and overwrites the drfualts with obj2.
        //If it already exists, it is overwritten. Else the defualt is preserved.
        var merge = function(obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        };
        
        var warn = function(msg) {
            if (console.warn) {
                console.warn("Card.JS Warning: " + msg);
            }
            else {
                console.log("Card.JS Warning: " + msg);
            }
        };

        var CardJSException = function(msg) {
            this.message = msg;
            this.toString = function() {
                return this.message;
            };
        };

        var cards = []; //to allow array to refrence card, cards are stored inside an internal array
        var decks = [];


        //Card Constants
        Card.TYPE = {
            STANDARD: 0,
            POKER: 0,
            CUSTOM: 1
        };
        // Suit constants. This makes it much easier to read.
        Card.SUIT = {
            CLUBS: 1,
            CLUB: 1,
            DIAMONDS: 2,
            DIAMOND: 2,
            HEARTS: 3,
            HEART: 3,
            SPADES: 4,
            SPADE: 4
        };

        //Card constructor
        Card.Card = function(options) {
            //make sure they create a new instance
            if (!(this instanceof Card.Card)) {
                warn("You did not create an new instance of Card.Card when calling Card.Card(). " +
                    "A new instance has been returned, but you should alter your source code. Refer " +
                    "to the documentation for more information.");
                return new Card.Card(options);
            }
            /*options:
            {
                location:(null, deck),
                type: (Card.type.standard)
            }
            
            */
            //merge the defualt options with the user inputed options.
            merge({
                suit:null,
                location:null
            }, options);
            this.test = function() {
                return cards.length;
            };

            cards.push(this);//add this to the card array. Changes are reflected.
            this.CardJSID = cards.length - 1; //the index of the last element in the array.

        };
        return Card;
    }
    //define globally if it doesn't already exist
    if (typeof(Card) === 'undefined') {
        window.Card = define();
    }
    else {
        console.log("Card already defined.");
    }
})(window);