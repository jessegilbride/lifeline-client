import React, { Component, Fragment } from 'react';
// import TimelineContext from '../../contexts/TimelineContext';
import './HomeLanding.css';
import timelineGraphic from '../../images/timeline-512x512.png'

export default class HomeLanding extends Component {
  // static contextType = TimelineContext;

  render() {
    return (
      <Fragment>
        <section className='page-top-banner' id='homepage-banner'>
          <h1 className=''>
            It's hard to remember everything in life. 
            <br />
            <br />
            So make a timeline!
          </h1>
        </section>
        <section className='site-intro-section'>
          <img src={timelineGraphic} alt='timeline graphic' className='homepage-timeline-graphic' />
          <p className='site-intro-content'></p>
        </section>

      </Fragment>
    );
  }
}
