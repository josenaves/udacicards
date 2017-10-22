import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
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
  inputField: {
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
export default class AddCard extends Component {
  static navigationOptions = {
    title: 'Add Card',
  };

  constructor(props) {
    super(props);
    this.state = { question: '', answer: '' };
    console.log('props:', props);
  }

  saveCard() {
    // props.navigation.state.params.deck
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          placeholder="Type in the question"
          onChangeText={text => this.setState({ question: text })}
          value={this.state.question}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Type in the answer"
          onChangeText={text => this.setState({ answer: text })}
          value={this.state.answer}
        />

        <TextButton style={[styles.button, styles.buttonBlack]} onPress={this.saveDeck}>
          Submit
        </TextButton>
      </View>
    );
  }
}
