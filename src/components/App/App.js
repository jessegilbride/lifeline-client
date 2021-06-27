import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import TimelinePage from '../../routes/TimelinePage/TimelinePage';
import CreateTimelineItem from '../../routes/CreateTimelineItem/CreateTimelineItem';
import CreateTimeline from '../../routes/CreateTimeline/CreateTimeline';
import TimelineItemPage from '../../routes/TimelineItemPage/TimelineItemPage';
import HomeLanding from '../../routes/HomeLanding/HomeLanding'
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';
import TimelineContext from '../../contexts/TimelineContext';
import TimelineApiService from '../../services/timeline-api-service';
import './App.css';

class App extends Component {
  state = { hasError: false };

  static contextType = TimelineContext;

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true }; // set hasError in state
  }

  componentDidMount() {
    /* log out when user is idle, per the interval set by the _WAIT_TIME variable */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.registerIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry( async () => {
        /* the timoue will call this callback just before the token expires */
        await AuthApiService.postRefreshToken();
      });

      /* Fetch timeline(s) */
      TimelineApiService.getTimelines()
        .then(timeline => this.context.setTimeline(timeline))
    }

    /* if there is a timeline currently set in localStorage, ensure it is passed to context */
    /* if (!!window.localStorage.getItem('timeline_id')) {
      this.context.setTimeline = window.localStorage.getItem('timeline_id');
    } */
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /* clear context */
    this.context.clearTimeline();
    this.context.clearItems();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  };

  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>Oh snap, there was an error.</p>}
          <Switch>
            <Route exact path={'/'} component={HomeLanding} />
            <PublicOnlyRoute path={'/login'} component={LoginPage} />
            <PublicOnlyRoute path={'/register'} component={RegistrationPage} />
            <PrivateRoute exact path={'/timeline'} component={TimelinePage} />
            <PrivateRoute path={'/create-timeline'} component={CreateTimeline} />
            <PrivateRoute path={'/create-timeline-item'} component={CreateTimelineItem} />
            <PrivateRoute exact path={'/item/:itemId'} component={TimelineItemPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <footer className='App__footer'>
          <div className='page-width-container'>
            <small>&copy; LifeLine {(new Date()).getFullYear()}</small>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
