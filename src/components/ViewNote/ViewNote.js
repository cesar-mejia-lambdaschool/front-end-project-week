import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, Badge } from 'reactstrap'
import './ViewNote.css'

class ViewNote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete (event) {
    this.props.deleteNote(this.props.note.id)
    this.props.history.push('/')
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    return (
      <div className='ViewNote'>
        <div className='note-form'>
          <Link className='note-edit' to={`/update/${this.props.note.id}`}>
            edit
          </Link>
          <button className='note-delete' onClick={this.toggle}>
            delete
          </button>
          <Modal
            className='modal-modal'
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalBody className='modal-body'>
              Are you sure you want to delete this?
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                className='delete-button'
                onClick={this.handleDelete}
              >
                Delete
              </Button>
              <Button
                color='success'
                onClick={this.toggle}
                className='no-button'
              >
                No
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <h2 className='note-title'>
          {this.props.note.title}
        </h2>
        <p className='note-content'>
          {this.props.note.content}
        </p>
        <hr />
        <section>
          {this.props.note.tags.map((tag, index) => (
            <Badge
              pill
              color='primary'
              className='ml-1'
              key={tag.value + index}
            >
              {tag.value}
            </Badge>
          ))}
        </section>
      </div>
    )
  }
}

export default withRouter(ViewNote)
