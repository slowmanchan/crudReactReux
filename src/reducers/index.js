import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// recommended to set alias for reducer (from redux-form);
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
