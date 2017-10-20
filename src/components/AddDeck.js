import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
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
export default class AddDeck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckHeader}>What is the title of your new deck?</Text>
        <TextInput style={{}} placeholder="Type deck name!" />
        <TextButton style={[styles.button, styles.buttonWhite]}>Submit</TextButton>
      </View>
    );
  }
}
