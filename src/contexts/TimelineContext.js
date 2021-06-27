import React, { Component } from 'react';

const nullLine = {};

const nullItems = [];

/* context initialization */
const TimelineContext = React.createContext({
  timeline: {},
  items: [],
  setTimeline: () => {},
  setItems: () => [],
  // setNewItem: () => [],
  clearTimeline: () => {},
  clearItems: () => [],
  // error: null
});

export default TimelineContext;

export class TimelineProvider extends Component {
  state = {
    timeline: {},
    items: [],
    error: null
  };

  setTimeline = (timeline) => {
    // window.localStorage.setItem('timeline_id', timeline[0].id);
    this.setState({ timeline });
  };

  setItems = (items) => {
    this.setState({ items });
  };
  
  /* setNewItem = (item) => { // instead of pulling all items from the DB, add a new entry using a setNewItem() method. Remember to POST item to DB.
    this.setState({ items: [...this.state.items, item] });
  }; */

  setError = (error) => {
    this.setState({ error })
  }

  clearTimeline = () => {
    this.setTimeline(nullLine);
  };
  
  clearItems = () => {
    this.setItems(nullItems);
  };

  render() {
    const value = {
      timeline: this.state.timeline,
      items: this.state.items,
      setTimeline: this.setTimeline,
      setItems: this.setItems,
      // setNewItem: this.setNewItem,
      setError: this.setError,
      clearTimeline: this.clearTimeline,
      clearItems: this.clearItems,
      error: this.state.error,
    };
    return (
      <TimelineContext.Provider value={value}>
        {this.props.children}
      </TimelineContext.Provider>
    );
  }
}
