import React, { Component } from 'react';
import { Field , reduxForm } from 'redux-form';
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

  renderField(field) {
    return (
      <div className='form-group'>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
      </div>
    )
  }

  render() {
    return (
      <form>
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
      </form>
    )
  }
}

export default reduxForm({
    form: 'PostsNewForm'
})(PostsNew);
// reduxForm() takes one arg (config object)
// each form must have a unique name
// form: 'PostsEditForm'
// the state will merge into 'form' if the names are the same
