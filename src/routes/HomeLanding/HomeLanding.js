import React, { Component, Fragment } from 'react';
// import TimelineContext from '../../contexts/TimelineContext';
import './HomeLanding.css';
// import timelineGraphic from '../../images/timeline-512x512.png'

export default class HomeLanding extends Component {
  // static contextType = TimelineContext;

  render() {
    return (
      <Fragment>
        <section className='page-top-banner' id='homepage-banner'>
          <h1 className=''>
            <span>Make a timeline of your life.</span>
            {/* <span className='bi-line'></span> */}
          </h1>
        </section>
        <section className='site-intro-section'>
          {/* <img src={timelineGraphic} alt='timeline graphic' className='homepage-timeline-graphic' /> */}
          <h2 className='site-intro-content'>Get started...</h2>
          <ol className='site-intro-features'>
            <li>login (or register)</li>
            <li>create the timeline</li>
            <li>add entries to the line</li>
            <li className='feature-greyed'>(more features coming soon)</li>
          </ol>
        </section>

      </Fragment>
    );
  }
}
