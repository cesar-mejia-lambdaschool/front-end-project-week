import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Button } from 'reactstrap'

import { fetchNotes } from '../../actions'
import './Register.css'

// const serverURL = 'https://lambda-notes-server.herokuapp.com'
const serverURL = 'https://lambda-notes-apiserver.herokuapp.com/'

class Register extends React.Component {
  state = {
    username: '',
    password: ''
  }

  render () {
    return (
      <div className='Register'>
        <h2>Register:</h2>
        <form onSubmit={this.submitHandler}>
          <div className='form-row'>
            <label>Username</label>
            <input
              name='username'
              value={this.state.username}
              onChange={this.inputHandler}
              type='text'
            />
          </div>
          <div className='form-row'>
            <label>Password</label>
            <input
              name='password'
              value={this.state.password}
              onChange={this.inputHandler}
              type='password'
            />
          </div>
          <div className='form-row'>
            <Button color='success' type='submit'>
              Register
            </Button>
          </div>
        </form>
      </div>
    )
  }

  inputHandler = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  submitHandler = event => {
    event.preventDefault()
    axios
      .post(`${serverURL}/api/register`, this.state)
      .then(response => {
        localStorage.setItem('authorization', `Bearer ${response.data.token}`)
        console.log('in first then')
      })
      .then(x => {
        this.props.fetchNotes()
        console.log('in second then')
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

export default connect(null, { fetchNotes })(Register)
