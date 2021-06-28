require('dotenv').config();

export default {
  // API_ENDPOINT: 'http://localhost:8000/api',
  // API_ENDPOINT: 'https://jessegilbride-lifeline-api.herokuapp.com/api',
  API_ENDPOINT: (process.env.NODE_ENV === 'development') ? 'http://localhost:8000/api' : 'https://jessegilbride-lifeline-api.herokuapp.com/api',
  TOKEN_KEY: 'lifeline-client-auth-token',
}
