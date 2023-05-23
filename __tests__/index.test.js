import React from 'react';
import { render } from 'react-test-renderer';
import Header from '../src/Header';

describe('Header component', () => {
  test('renders correctly', () => {
    const component = render(<Header />);
    expect(component).toMatchSnapshot();
  });
});
