import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Shelves from './Shelves';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Shelves />, div);
});

it('accepts a dynamic className', () => {
  const className = 'shelves-class'
  const newShelves = mount(<Shelves classes={className} />)
  expect(newShelves.find('.shelves-class').length).toEqual(1)
});

it('should return a list of shelved items', () => {
  const sparklingProps = {
    sparkling: {
      name: 'React',
    },
    reason: 'Need to practice VanillaJS',
  }
  const loadTop = jest.fn()
  const wrapper = mount(<Shelves sparkling={sparklingProps} />)
  const div = <div className="top-shelf">{sparkling.name}</div>
  const implicit = <div className="top-shelf">React</div>
  expect(wrapper.contains(div)).toEqual(true)
  expect(wrapper.contains(implicit)).toEqual(true)
});
