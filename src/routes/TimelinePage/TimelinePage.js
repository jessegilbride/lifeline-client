import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import TimelineApiService from '../../services/timeline-api-service';
import TimelineContext from '../../contexts/TimelineContext';
import TimelineItem from '../../components/TimelineItem/TimelineItem';
import './TimelinePage.css';

export default class TimelinePage extends Component {

  static contextType = TimelineContext;

  componentDidMount() {
    TimelineApiService.getTimelines()
      .then((timeline) => {
        if(timeline.length > 0) {
          this.context.setTimeline(timeline)
          return TimelineApiService.getItems(timeline[0].id)
        } 
        else {this.props.history.push('/create-timeline')}

        return [];
      })
      .then((items) => this.context.setItems(items))
      .catch(error => {
        console.log(error)
        // return this.context.setError(error)
      });
  }

  sortTheItems(items) {
    const itemsCopy = [...items];
    return itemsCopy.sort((a, b) => {
      return Date.parse(a.entry_date) - Date.parse(b.entry_date)
    })
  }

  renderTimelineItems() {
    const { items = [] } = this.context;
    const sortedItems = this.sortTheItems(items);
    return sortedItems.map((item, idx) => <TimelineItem itemData={item} key={idx} />).reverse()
  }

  render() {
    const { timeline, error } = this.context;
    return (
      <Fragment>
        <section className="page-width-container page-top-banner">
          <h2 className='timeline-heading'>{timeline[0] && timeline[0].line_name}</h2>
          <span className='timeline-subheading'>{timeline[0] && timeline[0].description}</span>
        </section>
        <section className="page-width-container timeline-container">
          <Link to='/create-timeline-item' className='btn btn-fixed add-item' aria-label='add timeline entry'>add item</Link>
          {error ? (
            <p className='red'>There was an error, try again</p>
          ) : (
            this.renderTimelineItems()
          )}
        </section>
      </Fragment>
    );
  }
}
