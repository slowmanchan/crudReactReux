import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions';
import { Link } from 'react-router-dom';
// Link is like the classic <a></a>

class PostsIndex extends Component {
  // called after comp has mounted on the dom (or rendered)
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
      // this.props.posts >> is an object (since we used lodash and turned
      // the array into an object)
      // use lodashs map method to iterate over objects
      return _.map(this.props.posts, post => {
        return (
            <li className='list-group-item' key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </Link>
              <button onClick={this.onDeleteClick.bind(this, post.id)}>x</button>
            </li>
            )
      })
  }

  onDeleteClick(id) {

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <div className='text-xs-right'>
          <Link to='/posts/new' className='btn btn-primary'>
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}
// we are not using mapStateToProps so null is the 1st arg to connect (intead of
// mapStateToProps)
// we can pass just the action creator as the 2nd arg to connect (instead of
// mapDispatch to props ) connect wil lmake the connection to dispatch for us automattically.
export default connect(mapStateToProps, { fetchPosts, deletePost })(PostsIndex);
