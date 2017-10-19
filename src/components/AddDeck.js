import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});

export default class AddDeck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Deck screen</Text>
      </View>
    );
  }
}
