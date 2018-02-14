import React, { Component } from 'react';
import { Field , reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
// reduxForm() >> similar to connect helper (redux)
//

// Inputs are >> <Field name='whatStateWeAreChanging'
// component={}
// Field keeps track of data but does not display anything
// component prop in Field will control the display of the input
// component is a function that will return JSX
// we dont call the function, Field will (so just pass a reference to the func)
class PostsNew extends Component {
  // this func handles the display for Field
  // it auto get a field obj arg (that you must include)
  // spread the field object in your input to give all the funcs
  // like onChange, onBlur, etc...
  // the field object will have props passed to it (like label='title'... field.label)
  // field.meta.touched ? field.meta.error : '' (if input is selected, then tab away, show error. otherwise no
  // error)
  renderField(field) {
    // double destructuring field.meta.touched == { meta: {touched} } = field
    const { meta: { touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values);
  }

  render() {
    const { handleSubmit } = this.props;
    // handleSubmit provided by Redux Form (will handle redux side of things)
    // we pass it our own onSubmit function (and bind it)

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Title for Post'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label='Post Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-secondary'>Submit</button>
        <Link to='/' className='btn btn-danger'>
          Cancel
          </Link>
      </form>
    )
  }
}
// called automattically when user tries to submit the form
// values arg is passed from redux form ( returns object with form input
// values and names { title: 'ajsdf', categories: 'asdjf', content: 'ajsdfk' })
function validate(values) {
  const errors = {}
  // validate the inputs from 'values'
  // add as many as you like
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }
  //if errors is empty, the form is fine to submit
  // if errors has *any* props, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
// reduxForm() takes one arg (config object)
// each form must have a unique name
// form: 'PostsEditForm'
// the state will merge into 'form' if the names are the same
// validate: validate is a function passed to as a config for redux form

// connect statement goes inside reduxForm({})(connect(null, {})());
