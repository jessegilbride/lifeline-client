import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from "react-router-dom";
import renderer from 'react-test-renderer';
import CreateTimeline from './CreateTimeline';

describe('CreateTimeline component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <MemoryRouter><CreateTimeline /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <MemoryRouter><CreateTimeline name="CreateTimeline" /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });

});
