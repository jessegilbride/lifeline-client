import React, { Component, Fragment } from 'react';
// import TimelineContext from '../../contexts/TimelineContext';
import './HomeLanding.css';

export default class HomeLanding extends Component {
  // static contextType = TimelineContext;

  render() {
    return (
      <Fragment>
        <section className='page-top-banner' id='homepage-banner'>
          <h1 className=''>welcome</h1>
        </section>
        <section className='site-intro-section'>
          <p className='site-intro-content'>sub-section</p>
        </section>

      </Fragment>
    );
  }
}
