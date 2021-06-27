import TokenService from './token-service';
import config from '../config';

const TimelineApiService = {
  getTimelines() {
    const token = 'bearer ' + TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/lines`, {
      method: 'GET',
      headers: {
        authorization: token,
        'content-type': 'application/json',
      },
      // body: JSON.stringify(timeline)
    })
    .then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()));
  },
  getItems(line_id) {
    return fetch(`${config.API_ENDPOINT}/items/forLine/${line_id}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()));
  },
  getItemById(item_id) {
    return fetch(`${config.API_ENDPOINT}/items/${item_id}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()));
  },
  // getItemsByCategory(line_id, category) {},
  // getItemsBySearch(line_id, searchString) {},
  getFullNameByUsername(user_name) {
    return fetch(`${config.API_ENDPOINT}/users/${user_name}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
    /* .then(res => {
      console.log(res)
      return res
    }) */
    .then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()))
    .catch(res => console.log(res))
  },
  postTimeline(line) {
    const token = 'bearer ' + TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/lines`, {
      method: 'POST',
      headers: {
        authorization: token,
        'content-type': 'application/json',
      },
      body: JSON.stringify(line),
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  postItem(item) {
    // console.log('item ... ', item);
    const token = 'bearer ' + TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/items/forLine/${item.line_id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // 'authorization': `bearer ${TokenService.getAuthToken()}`,
        'authorization': token,
      },
      body: JSON.stringify(item),
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

};

export default TimelineApiService;
