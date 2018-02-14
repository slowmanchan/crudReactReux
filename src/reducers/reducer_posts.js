import _ from 'lodash';
import { FETCH_POSTS, CREATE_POST } from '../actions';
// remember to use {} when importing a specific variable, function from a file
// no need to speciy index.js since we are importing it.

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}
