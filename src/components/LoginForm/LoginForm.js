import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
// import TimelineApiService from '../../services/timeline-api-service';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = event => {
    event.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = event.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
    /* .then(res => {
      window.localStorage.setItem(`username`, user_name.value)

      TimelineApiService.getFullNameByUsername(user_name.value)
      .then(res => {
        console.log(res)
        return res
      })
      .then(fullname => window.localStorage.setItem(`fullname`, fullname))
    }) */
    .then(res => {
      user_name.value = ''
      password.value = ''
      this.props.onLoginSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='error-message'>{error}</p>}
        </div>
        <div className='user_name form-section'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <input
            required
            name='user_name'
            defaultValue='demoUser'
            id='LoginForm__user_name'>
          </input>
        </div>
        <div className='password form-section'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <input
            required
            name='password'
            type='password'
            defaultValue='Hello123'
            id='LoginForm__password'>
          </input>
        </div>
        <button type='submit'>
          Login
        </button>
      </form>
    )
  }
}
