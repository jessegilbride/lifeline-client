import React, { Component, Fragment } from 'react';
import TimelineContext from '../../contexts/TimelineContext';
import TimelineApiService from '../../services/timeline-api-service';
import './CreateTimeline.css';

export default class CreateTimeline extends Component {
  static contextType = TimelineContext;

  handleSubmitTimeline = (event) => {
    event.preventDefault();
    const { line_name, description } = event.target;
    const line =  {
      line_name: line_name.value,
      description: description.value
    };
    TimelineApiService.postTimeline(line)
      .then((res) => {
        // console.log(res)
        return this.context.setTimeline
      })
      .then(() => {
        this.props.history.push('/timeline')
      })
      // .catch(this.context.setError); // use local state
  };

  render() {
    return (
      <Fragment>
        <section>
          <h2 className='page-heading'>Create Timeline</h2>
          <p>(message to user)</p>
        </section>
        <section>
          <form className='create-timeline-form' onSubmit={this.handleSubmitTimeline}>
            <div className='form-section'>
              <label htmlFor='line_name'>Timeline Name</label>
              <input
                type='text'
                id='line_name'
                name='line_name'
                placeholder=''
                required
              />
            </div>
            <div className='form-section'>
              <label htmlFor='description'>Description</label>
              <textarea id='description' name='description' rows='10' required></textarea>
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
