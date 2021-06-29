import React, { Component, Fragment } from 'react';
import TimelineContext from '../../contexts/TimelineContext';
import TimelineApiService from '../../services/timeline-api-service';
import { Link } from 'react-router-dom';
import './CreateTimelineItem.css';

export default class CreateTimelineItem extends Component {
  static contextType = TimelineContext;

  handleSubmitTimelineItem = (event) => {
    event.preventDefault();
    const { title, content, entry_date } = event.target;
    // const line_id = window.localStorage.getItem('timeline_id')
    // const line_id = this.context.timeline[0].id;
    const item =  {
      line_id: this.context.timeline[0].id,
      title: title.value, 
      content: content.value,
      entry_date: entry_date.value
    };
    TimelineApiService.postItem(item)
      .then((res) => {
        // console.log('successfully pushed item: ', res)
        this.props.history.push('/timeline')
      })
      .catch(error => {
        console.log(error)
        // this.context.setError(error)
      });

  };

  render() {
    return (
      <Fragment>
        <section>
          <h2 className='page-heading'>Add a timeline entry</h2>
        </section>
        <section>
          <Link to='/timeline' className='btn btn-fixed cancel-add-item' aria-label='cancel add entry'></Link>
          <form className='create-timeline-form' onSubmit={this.handleSubmitTimelineItem}>
            <div className='form-section'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                id='title'
                name='title'
                placeholder=''
                required
              />
            </div>
            <div className='form-section'>
              <label htmlFor='content'>Content</label>
              <textarea id='content' name='content' rows='10' required></textarea>
            </div>
            <div className='form-section'>
              <label htmlFor='entry_date'>Date</label>
              <input type='date' id='entry_date' name='entry_date' required></input>
            </div>
            <div className='button-section'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </section>
      </Fragment>
    );
  }
}
