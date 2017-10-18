import React from 'react';
import { Provider, observer } from 'mobx-react/native';
import { useStrict } from 'mobx';
import DeckList from './src/components/DeckList';
import store from './src/store/Store';

useStrict(true);

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DeckList />
      </Provider>
    );
  }
}
