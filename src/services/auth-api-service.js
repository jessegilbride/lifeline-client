import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'
import TimelineApiService from './timeline-api-service'
// import App from '../components/App/App'

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postLogin({ user_name, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user_name, password }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(res => {
        /*
          whenever a login is performed:
          1. save auth token in local storage 
          2. save the full name & user_name in local storage
          3. queue auto logout when the user goes idle
          4. queue a call to the refresh endpoint based on the JWT's exp value
        */
        TokenService.saveAuthToken(res.authToken)
        setNameInLocalStorage(user_name) // this must happen AFTER saveAuthToken(), requires API fetch has header auth
        IdleService.registerIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
  },
  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(res => {
        /*
          similar logic to whenever a user logs in, the only differences are:
          - don't need to queue the idle timers again as the user is already logged in
          - catch the error here as this refresh is happening behind the scenes
        */
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
      .catch(err => {
        console.log('refresh token request error')
        console.error(err)
        return false;
      })
  },
}

async function setNameInLocalStorage(user_name) {
  window.localStorage.setItem(`username`, user_name)

  // console.log('setNameInLocalStorage arg "user_name": ',user_name)

  await TimelineApiService.getFullNameByUsername(user_name)
  /* .then(user => {
    console.log('getFullNameByUsername response: ', user)
    return user
  }) */
  .then(user => window.localStorage.setItem(`fullname`, user.full_name))
  .catch(error => {
    console.error('unable to get user... ', error)
  })
}

export default AuthApiService
