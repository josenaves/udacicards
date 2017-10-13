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

const db = {};

export const getDecks = () => db;

export const getDeck = id => db[id];

export const saveDeckTitle = (title) => {
  db[title] = { title, questions: [] };
};

export const addCardToDeck = (title, card) => {
  db[title].questions = [...db[title].questions, card];
};
