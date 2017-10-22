import React, { PureComponent, Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { observer, inject } from 'mobx-react';
import { lightgrey } from '../colors';

const styles = StyleSheet.create({
  item: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckHeader: {
    fontSize: 26,
  },
  deckSubheader: {
    fontSize: 16,
  },
});

@inject('store')
@observer
export default class DeckListItem extends Component {
  render() {
    const { title, subTitle, onPressItem } = this.props;
    return (
      <TouchableHighlight
        onPress={() => onPressItem()}
        activeOpacity={0.7}
        underlayColor={lightgrey}
      >
        <View style={styles.item} {...this.props}>
          <Text style={styles.deckHeader}>{title}</Text>
          <Text style={styles.deckSubheader}>{subTitle}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
