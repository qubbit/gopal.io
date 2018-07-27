const FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
const DEFAULT_PARAMS = {
  api_key: '53259c75c76adda4e869ecac9a069d94',
  user_id: '66601325@N05',
  format: 'json',
  nojsoncallback: 1
};

// photoset_id=72157671514742408

function headers() {
  return {
    Accept: 'application/json'
  };
}

function parseResponse(response) {
  return response.json().then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    params = { ...DEFAULT_PARAMS, ...params };
    return fetch(`${FLICKR_API_URL}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers()
    }).then(parseResponse);
  }
};
