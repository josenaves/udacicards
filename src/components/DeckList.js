import { observer, inject } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, View, Text, StatusBar } from 'react-native';
import { loadDecks } from '../helpers/storageHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
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
    fontSize: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
  },
});

@inject('store')
@observer
export default class DeckList extends React.Component {
  async componentDidMount() {
    loadDecks();
    // Promise.all([
    //   saveDeckTitle('Science'),
    //   saveDeckTitle('Math'),
    //   saveDeckTitle('Geography'),
    //   addCardToDeck('Science', { question: 'How far is the Moon?', answer: "I don't know" }),
    // ]).then(async () => {
    //   const deck = await getDeck('Science');
    //   console.log('---------------deck', deck);
    // });
  }

  keyExtractor = data => data.title;

  renderItem = (data) => {
    const { item } = data;
    return (
      <View style={styles.item}>
        <Text style={styles.deckHeader}>{item.title}</Text>
        <Text style={styles.deckSubHeader}>{item.cardsCount} cards</Text>
      </View>
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { store } = this.props;
    const datasource = Object.keys(store.decks).map(d => ({
      title: d,
      cardsCount: store.decks[d].questions.length,
    }));
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <FlatList
          data={datasource}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
