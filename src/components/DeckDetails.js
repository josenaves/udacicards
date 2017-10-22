import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import TextButton from './TextButton';
import { white, black } from '../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckHeader: {
    fontSize: 60,
  },
  deckSubheader: {
    fontSize: 30,
  },
  button: {
    fontSize: 25,
    width: 200,
    margin: 10,
    padding: 15,
    borderColor: black,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  buttonWhite: {
    backgroundColor: white,
    color: black,
  },
  buttonBlack: {
    backgroundColor: black,
    color: white,
  },
});

@inject('store')
@observer
export default class DeckDetails extends React.Component {
  static navigationOptions = {
    title: 'udacicards',
  };

  render() {
    const { navigate } = this.props.navigation;
    const { deck } = this.props.navigation.state.params;
    const { store } = this.props;
    const cardsCount = store.decks[deck].questions.length;

    const cardsCountText = cardsCount === 1 ? `${cardsCount} card` : `${cardsCount} cards`;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.deckHeader}>{deck}</Text>
          <Text style={styles.deckSubheader}>{cardsCountText}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TextButton
            style={[styles.button, styles.buttonWhite]}
            onPress={() => navigate('AddCard', { deck })}
          >
            Add card
          </TextButton>
          <TextButton
            style={[styles.button, styles.buttonBlack]}
            onPress={() => navigate('Quiz', { deck })}
          >
            Start Quiz
          </TextButton>
        </View>
      </View>
    );
  }
}
