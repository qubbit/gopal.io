import * as TYPES from '../actions/types';

const initialState = {
  photos: [],
  album: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_ALBUM_PHOTOS_REQUEST:
      return { ...state, loading: true };
    case TYPES.FETCH_ALBUM_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photos: action.response.photoset.photo,
        album: action.response.photoset
      };
    default:
      return state;
  }
}
