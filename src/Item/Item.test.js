import React from 'react';
import ReactDOM from 'react-dom';
import Garage from './Garage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Garage />, div);
});
