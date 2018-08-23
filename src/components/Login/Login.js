import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios'

import { fetchNotes } from '../../actions'
import './Login.css'

// const serverURL = 'https://lambda-notes-server.herokuapp.com'
const serverURL = 'https://lambda-notes-apiserver.herokuapp.com'

class Login extends React.Component {
  state = {
    loading: false
  }

  renderField (field) {
    let dangerBorder = field.meta.touched && field.meta.error
      ? 'dangerBorder'
      : ''

    let dangerText = field.meta.touched && field.meta.error ? 'dangerText' : ''

    return (
      <div className={`form-group`}>
        <label>{field.label}</label>
        <input
          className={`form-control ${dangerBorder}`}
          type={field.type}
          {...field.input}
        />
        <div className={`text-help ${dangerText}`}>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <div className='Register'>
        <form onSubmit={handleSubmit(this.onSubmit)} style={{ width: '300px' }}>
          <h2>Login Account:</h2>
          <Field
            label='Username'
            name='username'
            type='text'
            component={this.renderField}
          />
          <Field
            label='Password'
            name='password'
            type='password'
            component={this.renderField}
          />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <h5 style={{ marginTop: '20px' }}>
            {this.state.loading && 'Loading page ...Please Wait.'}
          </h5>
        </form>
      </div>
    )
  }

  onSubmit = user => {
    this.setState({ loading: true })
    axios
      .post(`${serverURL}/api/login`, user)
      .then(response => {
        localStorage.setItem('authorization', `Bearer ${response.data.token}`)
        console.log('in first then')
      })
      .then(x => {
        this.props.history.push('/')
        console.log('in 3rd then')
      })
      .catch(err => {
        console.log('ERROR You are not authorized', err)
      })
  }
}

const validate = values => {
  const { username, password } = values
  const errors = {}
  if (!username || username.length < 3 || username.length > 20) {
    errors.username = 'Enter a username that is between 3 and 20 characters.'
  }
  if (!password || password.length < 3 || password.length > 20) {
    errors.password = 'Enter a password that is between 3 and 20 characters.'
  }

  return errors
}

export default reduxForm({ validate, form: 'LoginForm' })(
  connect(null, { fetchNotes })(Login)
)
