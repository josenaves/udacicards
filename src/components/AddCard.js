import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { observer, inject } from 'mobx-react';
import TextButton from './TextButton';
import { white, black } from '../colors';
import { addCardToDeck } from '../helpers/storageHelper';

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
  }

  saveCard = async () => {
    const { navigation } = this.props;
    const { deck } = navigation.state.params;
    const { question, answer } = this.state;
    const { store } = this.props;

    if (!question) {
      Alert.alert('Warning', 'Question cannot be empty !');
      return;
    }

    const arrQuestions = store.decks[deck].questions;
    const questions = arrQuestions.map(e => e.question);
    if (questions.includes(question)) {
      Alert.alert('Warning', 'Question was previous created !');
      return;
    }

    if (!answer) {
      Alert.alert('Warning', 'Answer cannot be empty !');
      return;
    }

    await addCardToDeck(deck, { question, answer });
    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };

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

        <TextButton style={[styles.button, styles.buttonBlack]} onPress={this.saveCard}>
          Submit
        </TextButton>
      </View>
    );
  }
}
