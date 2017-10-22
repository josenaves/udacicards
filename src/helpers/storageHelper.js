import { AsyncStorage } from 'react-native';
import store from '../store/Store';

// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'Combination of a function and the lexical environment...'
//       }
//     ]
//   }
// }

const DB_KEY = '@UdaciCards:key';

export const getDecks = async () => {
  try {
    const value = await AsyncStorage.getItem(DB_KEY);
    if (value) {
      return JSON.parse(value);
    }
    return {};
  } catch (error) {
    console.warn('Error getting decks:', error);
    return {};
  }
};

export const getDeck = async (id) => {
  if (store.decks === {}) {
    const decks = await getDecks();
    store.setDecks(decks);
  }
  const deck = store.decks[id];
  return deck;
};

export const saveDeckTitle = async (title) => {
  try {
    let value = await getDecks();
    console.log('read:', value);
    if (!value) {
      value = {};
    }

    if (!value[title]) {
      value[title] = { name: title, questions: [] };
      store.setDecks(value);
      await AsyncStorage.setItem(DB_KEY, JSON.stringify(value));
    } else {
      store.setDecks(value);
    }
  } catch (error) {
    console.warn('Error getting decks:', error);
  }
};

export const addCardToDeck = async (deckTitle, card) => {
  let decks = store.getDecks;
  if (!decks) {
    decks = await getDecks();
  }

  if (!decks[deckTitle]) {
    decks[deckTitle] = { name: deckTitle, questions: [{ ...card }] };
  } else {
    decks[deckTitle].questions = [...decks[deckTitle].questions, card];
  }

  store.setDecks(decks);

  try {
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(decks));
  } catch (error) {
    console.warn('Error adding card to deck:', error);
  }
};

export const loadDecks = async () => {
  try {
    const decks = await getDecks();
    store.setDecks(decks);
  } catch (error) {
    console.warn('Error loading decks:', error);
  }
};
