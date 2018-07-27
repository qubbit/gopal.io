import * as TYPES from '../actions/types';

const initialState = {
  albums: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_ALBUMS_REQUEST:
      return { ...state, loading: true };
    case TYPES.FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        loading: false,
        albums: action.response.photosets.photoset
      };
    default:
      return state;
  }
}
