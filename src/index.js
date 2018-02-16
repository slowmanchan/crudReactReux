import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Route, can render in any react component.
// BrowserRouter interactts with History lib
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import promise from 'redux-promise';

import reducers from './reducers';

require('../style/style.scss')

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// Route, props > path='' (eg /hello) component={Hello} (user clicks path goes to component)
// BrowserRouter can only have one child (wrap routes in div to have multiple routes)
// React Router does fuzzy matching ('/posts/new will match / as well cuz it has / in it')
// Switch (from Rrouter) will render the routes from top to bottom
// order your routes if you are having issues. (put '/' at the bottom)
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/posts/new' component={PostsNew} />
          <Route path='/posts/:id' component={PostsShow} />
          <Route path='/' component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
