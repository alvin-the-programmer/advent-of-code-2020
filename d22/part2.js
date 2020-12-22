const fs = require('fs').promises;


const DECK_1 = [
  24, 22, 26,  6, 14, 19, 27, 17,
  39, 34, 40, 41, 23, 30, 36, 11,
  28,  3, 10, 21,  9, 50, 32, 25,
   8
];

const DECK_2 = [
  48, 49, 47, 15, 42, 44,  5,  4,
  13,  7, 20, 43, 12, 37, 29, 18,
  45, 16,  1, 46, 38, 35,  2, 33,
  31
];

const solve = async () => {
  // const deck1 = DECK_1;
  // const deck2 = DECK_2;
  const [ deck1, deck2 ] = await getInput()

  const [ winner, winningDeck ] = playGame(deck1, deck2);
  let score = 0;
  console.log(winningDeck)
  const reversed = winningDeck.slice().reverse();
  for (let i = 0; i < reversed.length; i += 1) {
    score += reversed[i] * (i + 1);
  }
  return score;
};

const HISTORY = new Set();

const playGame = (deck1, deck2) => {
  const state = `${deck1.join(',')}-${deck2.join(',')}`;
  if (HISTORY.has(state))
    return [ 1, deck1 ];

  HISTORY.add(state);

  if (deck2.length === 0)
    return [ 1, deck1 ];

  if (deck1.length === 0)
    return [ 2, deck2 ];

  const card1 = deck1.shift();
  const card2 = deck2.shift();
  if (deck1.length >= card1 && deck2.length >= card2) {
    const nextDeck1 = deck1.slice(0, card1 + 1);
    const nextDeck2 = deck2.slice(0, card2 + 1);
    const [ winner, winningDeck ] = playGame(nextDeck1, nextDeck2);
    if (winner === 1) {
      return playGame([...deck1, card1, card2], [...deck2]);
    } else {
      return playGame([...deck1], [...deck2, card2, card1]);
    }
  } else {
    if (card1 > card2) {
      return playGame([...deck1, card1, card2], [...deck2]);
    } else {
      return playGame([...deck1], [...deck2, card2, card1]);
    }
  }
};

const getInput = async () => {
  // const data = await fs.readFile('./looper', {encoding: 'utf-8'});
  // const data = await fs.readFile('./input', {encoding: 'utf-8'});
  const data = await fs.readFile('./example', {encoding: 'utf-8'});
  return data.split('\n\n').map(parseDeck);
};

const parseDeck = (chunk) => chunk.split("\n").slice(1).map(Number);


solve().then(console.log);