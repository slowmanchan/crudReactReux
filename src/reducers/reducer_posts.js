import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';
// remember to use {} when importing a specific variable, function from a file
// no need to speciy index.js since we are importing it.

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_POST:
      // es5 version:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      // es6 version:
      // key interpolation > create a object key [action.payload.data.id]
      // with action.payload.data as its value
      return { ...state, [action.payload.data.id]: action.payload.data };


      return { ...state,  };
  default:
    return state;
  }
}
