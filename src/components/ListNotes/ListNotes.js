import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'
import { Link, withRouter } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, Button, Badge } from 'reactstrap'

import './ListNotes.css'

class ListNotes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      loading: false,
      search: ''
    }
  }

  componentWillMount () {
    const token = localStorage.getItem('authorization')
    if (!token) {
      this.props.clearState()
      console.log('NO TOKEN: clear state should have launched')
      return this.setState({ loggedIn: false })
    }
    const decoded = jwtDecode(token)
    const now = new Date().getTime()
    const expiredToken = now >= decoded.exp

    if (expiredToken) {
      this.props.clearState()
      console.log('EXPIRED TOKEN, clear state should have launched')
      this.setState({ loggedIn: false })
    } else {
      this.setState({ loggedIn: true })
    }
  }

  toggle = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  onSearch = ({ target }) => {
    this.setState({
      search: target.value
    })
  }

  render () {
    const { search } = this.state
    const filteredNotes = this.props.notes.filter(note => {
      return (
        note.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        note.content.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        note.tags
          .map(tag => tag.value)
          .join('')
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      )
    })

    return (
      <section className='ListNotes m-0 p-0'>
        {this.props.username
          ? <input
            type='text'
            className='search-bar'
            placeholder='search'
            name='search'
            value={this.state.search}
            onChange={this.onSearch}
          />
          : null}
        <Modal
          className='modal-modal'
          isOpen={!this.state.loggedIn}
          toggle={this.toggle}
          backdrop='static'
        >
          <ModalBody className='modal-body'>
            Please Register/Login to access Lambda Notes
          </ModalBody>
          <ModalFooter>
            <Button
              color='success'
              className='register-button'
              onClick={() => this.props.history.push('/register')}
            >
              Register
            </Button>
            <Button
              color='primary'
              onClick={() => this.props.history.push('/login')}
              className='login-button'
            >
              Login
            </Button>
          </ModalFooter>
        </Modal>
        {this.props.username
          ? <h2 className='list_h2'>
            {this.props.username.charAt(0).toUpperCase() +
                this.props.username.substr(1).toLowerCase()}
              's Notes:
          </h2>
          : null}

        <div className='notes p-0 m-0'>
          {filteredNotes.map(note => (
            <div id='Card' className='card p-0 m-2' key={note.id}>
              <div className='card-body m-0 p-1'>
                <Link className='card-title' to={`/view/${note.id}`}>
                  <h4 className='card-title px-2'>
                    {note.title.length >= 25
                      ? note.title.substr(0, 25) + ' ...'
                      : note.title}
                  </h4>
                </Link>
                <span className='card-text px-2'>
                  {note.content.length >= 175
                    ? note.content.substr(0, 175) + ' ...'
                    : note.content}
                </span>
              </div>
              <div className='card-footer m-0 px-0 py-1'>
                {note.tags.map((tag, index) => (
                  <Badge
                    pill
                    color='primary'
                    className='ml-1 badge-tag'
                    key={tag.value + index}
                    onClick={() => {
                      this.setState({ search: tag.value })
                    }}
                  >
                    {tag.value}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}
export default withRouter(ListNotes)
