import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { TimelineProvider } from './contexts/TimelineContext';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
      <TimelineProvider>
        <App />
      </TimelineProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
