import { combineReducers } from 'redux';
import albums from './albums';
import photos from './photos';

const appReducer = combineReducers({
  albums,
  photos,
});

export default function(state, action) {
  return appReducer(state, action);
}
