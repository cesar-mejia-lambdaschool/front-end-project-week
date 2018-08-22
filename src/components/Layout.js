import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import NavBar from './NavBar/NavBar'
import ListNotes from './ListNotes/ListNotes'
import CreateNote from './CreateNote/CreateNote'
import ViewNote from './ViewNote/ViewNote'
import UpdateNote from './UpdateNote/UpdateNote'
import Register from './Register/Register'
import Login from './Login/Login'

import {
  fetchNotes,
  fetchNote,
  createNote,
  deleteNote,
  updateNote,
  clearState
} from '../actions'

import './Layout.css'

// const serverURL = 'https://lambda-notes-server.herokuapp.com'
class Layout extends Component {
  componentDidMount () {
    this.props.fetchNotes()
  }

  // getNotes = () => {
  //   const token = localStorage.getItem('authorization')
  //   axios
  //     .get(`${serverURL}/api/notes`, { headers: { authorization: token } })
  //     .then(res => {
  //       this.setState({
  //         notes: res.data.notes,
  //         username: res.data.username
  //       })
  //     })
  //     .catch(err => console.log(err))
  // }

  // clearState = () => {
  //   this.setState({
  //     notes: [],
  //     title: '',
  //     content: '',
  //     username: ''
  //   })
  // }

  // createNote = tags => {
  //   const token = localStorage.getItem('authorization')
  //   const { title, content } = this.state
  //   const note = { title, content, tags }
  //   axios
  //     .post(`${serverURL}/api/notes`, note, {
  //       headers: { authorization: token }
  //     })
  //     .then(res => {
  //       this.setState({
  //         notes: res.data,
  //         title: '',
  //         content: ''
  //       })
  //     })
  //     .catch(err => console.log(err))
  // }

  // deleteNote = id => {
  //   axios
  //     .delete(`${serverURL}/api/notes/${id}`, {
  //       headers: {
  //         authorization: localStorage.getItem('authorization')
  //       }
  //     })
  //     .then(res => {
  //       this.setState({ notes: res.data })
  //     })
  //     .catch(err => console.log(err))
  // }

  // updateNote = (note, tags) => {
  //   const { title, content } = this.state
  //   const updateNote = {}
  //   updateNote.title = title || note.title
  //   updateNote.content = content || note.content
  //   updateNote.tags = tags
  //   axios
  //     .put(`${serverURL}/api/notes/${note.id}`, updateNote, {
  //       headers: { authorization: localStorage.getItem('authorization') }
  //     })
  //     .then(res => {
  //       this.setState({
  //         notes: res.data,
  //         title: '',
  //         content: ''
  //       })
  //     })
  //     .catch(err => console.log(err))
  // }

  // newTitle = event => {
  //   this.setState({
  //     title: event.target.value
  //   })
  // }

  // newContent = event => {
  //   this.setState({
  //     content: event.target.value
  //   })
  // }
  registerSuccess = data => {
    localStorage.setItem('authorization', `Bearer ${data.token}`)
    this.props.fetchNotes()
  }

  componentWillMount () {
    // this.props.clearState()
    // localStorage.clear()
  }
  render () {
    return (
      <div className='Layout'>
        <NavBar />

        <Route
          exact
          path='/'
          render={props => (
            <ListNotes
              {...props}
              clearState={this.props.clearState}
              notes={this.props.notes}
              username={this.props.username}
            />
          )}
        />
        <Route
          path='/create'
          render={props => (
            <CreateNote {...props} createNote={this.props.createNote} />
          )}
        />
        <Route
          path='/view/:id'
          render={props => (
            <ViewNote
              {...props}
              deleteNote={this.props.deleteNote}
              fetchNote={this.props.fetchNote}
              note={this.props.note}
            />
          )}
        />
        <Route
          path='/update/:id'
          render={props => (
            <UpdateNote
              {...props}
              updateNote={this.props.updateNote}
              fetchNote={this.props.fetchNote}
              note={this.props.note}
            />
          )}
        />
        <Route
          path='/register'
          render={props => (
            <Register {...props} onRegister={this.registerSuccess} />
          )}
        />
        <Route
          path='/login'
          render={props => <Login {...props} onLogin={this.registerSuccess} />}
        />
        <Redirect to='/' />
      </div>
    )
  }
}

const mapStateToProps = ({ notes, note, username }) => {
  return {
    notes,
    note,
    username
  }
}

export default connect(mapStateToProps, {
  fetchNotes,
  fetchNote,
  createNote,
  deleteNote,
  updateNote,
  clearState
})(Layout)
