import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimelineContext from '../../contexts/TimelineContext';
import TimelineApiService from '../../services/timeline-api-service';
import { NiceDate } from '../../components/Utils/Utils';
import './TimelineItemPage.css';

export default class TimelineItemPage extends Component {
  static defaultProps = {
    match: { params: {} } // React Router default
  };

  static contextType = TimelineContext;

  state = { 
    currentItem: {},
    error: null
  }

  componentDidMount() {
    const { itemId } = this.props.match.params; // React Router prop
    // const { items } = this.context;

    TimelineApiService
      .getItemById(itemId)
      .then(item => {
        /* if (Date.parse(item.entry_date).isNaN) {
          console.log('not a number')
        } else {
          console.log(Date.parse(item.entry_date))
        } */
        this.setState({currentItem: item})
      })
      .catch(error => {
        console.log(error)
        this.setState({error})
      });
  }

  makeTimelineItemPage() {
    // const { line } = this.context;

    const item = this.state.currentItem;

    /* function ComponentName() {
      return <div className=''></div>;
    } <ComponentName /> */

    return (
      <>
        <header>
          <h2>{item.title}</h2>
        </header>
        <p>
          <NiceDate date={item.entry_date} />
        </p>
        <p>
          {item.content}
        </p>
      </>
    );
  }

  render() {
    const { currentItem, error } = this.state;
    let pageContent;
    if (error) {
      console.log('TimelineItemPage render error: ', error)
      pageContent =
        // This error 'string' must match the error response from items-router.checkItemExists
        error.error === `Item does not exist.` ? (
          <p className='red'>Item does not exist.</p>
        ) : (
          <p className='red'>There was an error. Sorry about that. Head <Link to='timeline'>back to the timeline</Link>?</p>
        );
    } else if (!currentItem) { // << fix?
      pageContent = <span className='spinner-container'><div className="lds-roller"> <div></div> <div></div> <div></div> </div></span>;
    } else {
      pageContent = this.makeTimelineItemPage();
    }
    return <section className='LineItemView'>{pageContent}</section>;
  }

}
