import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import NavBar from './NavBar/NavBar'
import ListNotes from './ListNotes/ListNotes'
import CreateNote from './CreateNote/CreateNote'
import ViewNote from './ViewNote/ViewNote'
import UpdateNote from './UpdateNote/UpdateNote'
import Register from './Register/Register'
import Login from './Login/Login'
import NotFound from './NotFound/NotFound'

import { fetchNotes, fetchNote } from '../actions'
import './Layout.css'

class Layout extends Component {
  componentDidMount () {
    if (localStorage.getItem('authorization')) this.props.fetchNotes()
  }

  render () {
    return (
      <div className='Layout'>
        <NavBar />
        <Switch>
          <Route exact path='/' render={props => <ListNotes {...props} />} />
          <Route path='/create' render={props => <CreateNote {...props} />} />
          <Route path='/view/:id' render={props => <ViewNote {...props} />} />
          <Route
            path='/update/:id'
            render={props => <UpdateNote {...props} />}
          />
          <Route
            path='/register'
            render={props => (
              <Register {...props} onRegister={this.registerSuccess} />
            )}
          />
          <Route
            path='/login'
            render={props => (
              <Login {...props} onLogin={this.registerSuccess} />
            )}
          />
          <Route to='/404' component={NotFound} />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = ({ username, notes }) => {
  return { username, notes }
}

export default withRouter(
  connect(mapStateToProps, { fetchNotes, fetchNote })(Layout)
)
