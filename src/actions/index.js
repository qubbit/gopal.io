import api from '../api';
import * as TYPES from './types';

export function fetchAlbums(params = {}) {
  params = { ...params, method: 'flickr.photosets.getList' };

  return dispatch => {
    dispatch({ type: TYPES.FETCH_ALBUMS_REQUEST });

    return api.fetch('', params).then(response => {
      dispatch({ type: TYPES.FETCH_ALBUMS_SUCCESS, response, params });
    });
  };
}

export function fetchAlbumPhotos(params = {}) {
  params = {
    ...params,
    method: 'flickr.photosets.getPhotos',
    extras: 'description,date_taken,url_m,url_c,url_l,url_h,url_o'
  };

  return dispatch => {
    dispatch({ type: TYPES.FETCH_ALBUM_PHOTOS_REQUEST });

    return api.fetch('', params).then(response => {
      dispatch({ type: TYPES.FETCH_ALBUM_PHOTOS_SUCCESS, response });
    });
  };
}
