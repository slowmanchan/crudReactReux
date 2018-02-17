import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    // this is provided by react route (match.params.id)
    // will grab the params from the url (this clase /posts/:id )
    // so params.id = :id
    const { id } = this.props.match.params;
    this.props.fetchPost(id)
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    });
  }
  // render will fire off as soon as component is mounted
  // will return undefined for sure.
  // add a check to prevent an error if (!post)
  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link className='btn btn-primary' to='/'>Back to Index</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
          className='btn btn-danger pull-xs-right'
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}
// ownProps > whenver this component is rendered
// ownProps is the components props when rendered
// ownProps === this.props
function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
