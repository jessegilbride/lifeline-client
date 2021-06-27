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
        // console.log('getTimelines() ... ', timeline)

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
        // return this.context.setError // use local state
      });

    // const line_id = this.context.line.id;
    // const line_id = 1; // hard-coded, needs to be dynamic

    // TimelineApiService.getItems(line_id)
      // .then((items) => this.context.setItems(items))
      // .catch(error => {
        // console.log(error)
        // return this.context.setError // use local state
      // })
  }

  sortTheItems(items) {
    const itemsCopy = [...items];
    
    return itemsCopy.sort((a, b) => {
      // console.log('a: ', a)
      // console.log('a.entry_date: ', a)
      // console.log('b.entry_date: ', b)
      // console.log('b.entry_date: ', b)
      return Date.parse(a.entry_date) - Date.parse(b.entry_date)
    })
  }

  renderTimelineItems() {
    const { items = [] } = this.context;
    
    const sortedItems = this.sortTheItems(items);
    // console.log('sortedItems... ', sortedItems)
    // console.log('items... ', items)

    return sortedItems.map((item, idx) => <TimelineItem itemData={item} key={idx} />).reverse()

    // {id, line_id, title, content, entry_date}
    // return items.map((item, idx) => <TimelineItem itemData={item} key={idx} />)
  }

  render() {
    const { timeline, error } = this.context;
    return (
      <Fragment>
        <section className="page-width-container page-top-banner">
          <h2 className='page-heading'>{timeline && timeline.line_name}</h2>
        </section>
        <section className="page-width-container timeline-container">
          <Link to='/create-timeline-item' className='btn btn-fixed add-item' aria-label='add timeline entry'>add item</Link>
          {error ? (
            <p className='red'>There was an error, try again</p>
          ) : (
            this.renderTimelineItems()
          )}
          {/* {this.renderTimelineItems()} */}
        </section>
      </Fragment>
    );
  }
}
