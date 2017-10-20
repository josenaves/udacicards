import React from 'react';
import { FlatList, StyleSheet, View, Text, StatusBar } from 'react-native';
import { observer, inject } from 'mobx-react';
import { loadDecks } from '../helpers/storageHelper';
import DeckListItem from './DeckListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
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
  }

  onPressItem = (item) => {
    const { navigate } = this.props.navigation;
    navigate('DeckDetails', { item });
  };

  keyExtractor = item => item.title;

  renderItem = ({ item }) => (
    <DeckListItem
      onPressItem={() => this.onPressItem(item)}
      title={item.title}
      subTitle={`${item.cardsCount} cards`}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { store } = this.props;
    const datasource = Object.keys(store.decks).map(data => ({
      title: data,
      cardsCount: store.decks[data].questions.length,
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
