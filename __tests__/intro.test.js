// __tests__/intro.test.js
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
