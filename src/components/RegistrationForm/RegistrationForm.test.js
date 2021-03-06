import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from "react-router-dom";
import renderer from 'react-test-renderer';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <MemoryRouter><RegistrationForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <MemoryRouter><RegistrationForm name="RegistrationForm" /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });

});
