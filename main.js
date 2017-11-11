import * as Card from '/card.js';

let card = new Card.Card({
    number: 6,
    suit: Card.SUIT.SPADE
});
let deck = new Card.Deck();

console.log(card.getString());
console.log(card);

card.addTo(deck);
console.log(card);
console.log(deck);

card.removeFromDeck();
console.log(card);
console.log(deck);


deck.add(new Card.Card({
    number: 4,
    suit: Card.SUIT.SPADE
}));
console.log(deck);

deck.remove(Card.Internal.cards[1]);
console.log(deck);


deck.add(new Card.Card({
    number: 9,
    suit: Card.SUIT.CLUB
}));
deck.add(new Card.Card({
    number: 8,
    suit: Card.SUIT.HEART
}));
deck.add(new Card.Card({
    number: 13,
    suit: Card.SUIT.DIAMOND
}));
deck.add(new Card.Card({
    number: 2,
    suit: Card.SUIT.CLUB
}));
console.log(deck);
console.log(deck.getString());

deck.shuffle();

console.log(deck);
console.log(deck.getString());

deck.sort();

console.log(deck);
console.log(deck.getString());
