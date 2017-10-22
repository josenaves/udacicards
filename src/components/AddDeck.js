import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { observer, inject } from 'mobx-react';
import TextButton from './TextButton';
import { white, black } from '../colors';
import { saveDeckTitle } from '../helpers/storageHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  deckTitle: {
    fontSize: 50,
    textAlign: 'center',
  },
  inputDeck: {
    marginTop: 30,
    width: '90%',
    height: 50,
    fontSize: 18,
    borderColor: black,
    borderWidth: 0.5,
  },
  button: {
    marginTop: 30,
    fontSize: 25,
    width: 200,
    padding: 15,
    borderColor: black,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  buttonBlack: {
    backgroundColor: black,
    color: white,
  },
});

@inject('store')
@observer
export default class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { deckTitle: '' };
  }

  saveDeck = async () => {
    const { navigate } = this.props.navigation;
    const { deckTitle } = this.state;
    const { store } = this.props;

    if (!deckTitle) {
      Alert.alert('Warning', 'Deck title cannot be empty !');
      return;
    }

    if (store.deckTitles.includes(deckTitle)) {
      Alert.alert('Warning', 'Deck title already exists !');
      return;
    }

    await saveDeckTitle(deckTitle);
    this.setState({ deckTitle: '' });
    navigate('DeckList');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.inputDeck}
          placeholder="Type deck title"
          onChangeText={text => this.setState({ deckTitle: text })}
          value={this.state.deckTitle}
        />
        <TextButton style={[styles.button, styles.buttonBlack]} onPress={this.saveDeck}>
          Submit
        </TextButton>
      </View>
    );
  }
}
