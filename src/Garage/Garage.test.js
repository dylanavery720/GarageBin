import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Garage from './Garage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Garage />, div);
});

it('accepts a dynamic className', () => {
  const className = 'garage-class'
  const newGarage = mount(<Garage classes={className} />)
  expect(newGarage.find('.garage-class').length).toEqual(1)
});

it('should have a closed door with an open button when closed', () => {
  const wrapper = mount(<Garage />)
  const open = <button onClick={this.openGarage.bind(this)}>Open</button>
  expect(wrapper.contains(open)).toEqual(true)
});

it('should make an API call when Garage Door is opened', () => {
  const getItems = jest.fn()
  const wrapper = mount(<Garage getItems={getItems} />)
  const button = wrapper.find('button')
  button.simulate('click')
  expect(getItems.mock.calls.length).toBe(1)
});

it('should return a logout button and welcome message if access token present', () => {
  const tokenProps = {
    user: {
      name: 'D Diddy Bop',
    },
    token: '1248192470',
  }
  const logOut = jest.fn()
  const wrapper = mount(<Garage token={tokenProps} logOut={logOut} />)
  const welcome = <h3>WELCOME, {tokenProps.user.name}</h3>
  const logout = <a onClick={logOut}>Log Out</a>
  expect(wrapper.contains(logout)).toEqual(true)
  expect(wrapper.contains(welcome)).toEqual(true)
});
