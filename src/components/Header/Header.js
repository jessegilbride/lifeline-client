import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import TimelineContext from '../../contexts/TimelineContext';
import './Header.css';

// const hyphen = <span className="hyphen-spacer"> / </span>;

export default class Header extends Component {

  static contextType = TimelineContext;

  handleMobileNavUsage = () => {
    const menuToggle = document.querySelector('input#menu-btn');
    if (menuToggle.checked) {
      menuToggle.checked = false;
      return; // unnecessary?
    } else return;
  }
  
  handleLogoutClick = () => {
    this.handleMobileNavUsage();
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.context.clearTimeline();
    this.context.clearItems();
    // window.localStorage.clear(); // MOVED to: TokenService.clearAuthToken()
  };

  renderLoggedInItems() {
    return (
      <>
      {/* {this.context.timeline.length > 0 ? 
        <li className='view-timelines'>
          <Link to='/timeline' className='view-timelines-link btn' onClick={this.handleMobileNavUsage}>View timeline</Link>
        </li>
       : null}
      {this.context.timeline.length === 0 ? 
        <li className='create-timeline'>
          <Link to='/create-timeline' className='create-timeline-link btn' onClick={this.handleMobileNavUsage}>Create timeline</Link>
        </li>
       : null} */}
      {this.context.timeline.length === 0 ? 
        <li className='create-timeline'>
          <Link to='/create-timeline' className='create-timeline-link btn' onClick={this.handleMobileNavUsage}>Create timeline</Link>
        </li>
       : 
        <li className='view-timelines'>
          <Link to='/timeline' className='view-timeline-link btn' onClick={this.handleMobileNavUsage}>View timeline</Link>
        </li>}
      <li className='login-logout'>
        <Link to='/' className='login-logout-link btn' onClick={this.handleLogoutClick}>Log out</Link>
      </li>
      </>
    );
  }

  renderLoggedOutItems() {
    return (
      <li className='login-logout'>
        <Link to='/login' className='login-logout-link btn' onClick={this.handleMobileNavUsage}>Register/Login</Link>
      </li>
    );
  }

  render() {
    return (
      <nav role="navigation">
        <Link to='/' className='logo' onClick={this.handleMobileNavUsage}>LifeLine</Link>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='menu-label-content'>Menu</span>
          <div></div>
          <span className='navicon'></span>
        </label>
        <ul className='menu'>
          {TokenService.hasAuthToken() ? this.renderLoggedInItems() : this.renderLoggedOutItems()}
        </ul>
      </nav>
    );
  }
}
