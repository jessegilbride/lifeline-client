import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NiceDate } from '../Utils/Utils';
import './TimelineItem.css';

export default class TimelineItem extends Component {
  render() {
    
    // id, line_id, title, content, entry_date
    const { itemData } = this.props;
    
    return (
      <Link to={`/item/${itemData.id}`} className='TimelineItem'>
        <div className='timeline-item-content'>
          <header className='TimelineItem__header'>
            <h3 className='TimelineItem__heading'>{itemData.title}</h3>
          </header>
          <span className='TimelineItem__date'>
            <NiceDate date={itemData.entry_date} />
          </span>
        </div>
      </Link>
    );
  }
}

TimelineItem.defaultProps = {
  // id, line_id, title, content, entry_date
  itemData: {}
}
