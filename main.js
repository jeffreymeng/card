import * as Card from '/card.js';


let deck = new Card.Deck();

deck.add(new Card.Card({
    number: Card.NUMBER['4'],
    suit: Card.SUIT.SPADE
}));
deck.add(new Card.Card({
    number: Card.NUMBER['9'],
    suit: Card.SUIT.CLUB
}));
deck.add(new Card.Card({
    number: Card.NUMBER['8'],
    suit: Card.SUIT.HEART
}));
deck.add(new Card.Card({
    number: Card.NUMBER.KING,
    suit: Card.SUIT.DIAMOND
}));
deck.add(new Card.Card({
    number: Card.NUMBER['2'],
    suit: Card.SUIT.CLUB
}));

console.log(deck.getString());

deck.shuffle();

console.log(deck.getString());
