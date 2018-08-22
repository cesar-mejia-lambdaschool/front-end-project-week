import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge } from 'reactstrap'

import { updateNote, fetchNote } from '../../actions'
import './UpdateNote.css'
class UpdateNote extends Component {
  state = {
    tags: [],
    tag: '',
    title: '',
    content: ''
  }

  handleUpdate = event => {
    event.preventDefault()
    const { title, content, tags } = this.state
    const note = { title, content, tags, id: this.props.match.params.id }
    this.props.updateNote(note).then(x => {
      this.props.history.push('/')
    })
  }

  handleTag = e => {
    e.preventDefault()
    const value = this.state.tag
    this.setState({
      tags: [value, ...this.state.tags],
      tag: ''
    })
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  componentDidMount () {
    this.props.fetchNote(this.props.match.params.id).then(x => {
      this.setState({
        tags: this.props.note.tags.map(tag => tag.value),
        content: this.props.note.content,
        title: this.props.note.title
      })
    })
  }
  render () {
    return (
      <div className='UpdateNote'>
        <form
          className='update-form form-group mx-3'
          onSubmit={this.handleUpdate}
        >
          <label className='input-label'>
            <h2 className='label-h2'>Edit Note:</h2>
          </label>
          <input
            required
            name='title'
            className='input-title form-control'
            type='text'
            placeholder='Note Title'
            value={this.state.title}
            onChange={this.handleChange}
          />
          <section>
            <label className='label-tag'>Add Tag:</label>
            <input
              name='tag'
              className='input-tag'
              type='text'
              placeholder='Note Tag'
              onChange={this.handleChange}
              value={this.state.tag}
            />
            <button
              className='btn-sm btn-success ml-2'
              onClick={this.handleTag}
            >
              Add Tag
            </button>
            {this.state.tags.map((tag, index) => (
              <Badge
                pill
                className='badge-tag ml-2'
                color='primary'
                key={tag + index}
                onClick={() => {
                  this.setState({
                    tags: this.state.tags.filter(curTag => tag !== curTag)
                  })
                }}
              >
                {tag} x
              </Badge>
            ))}
          </section>
          <textarea
            required
            name='content'
            className='input-body form-control'
            type='text'
            placeholder='Note Content'
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button className='sav-btn' type='submit'>
            Update
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ note }) => {
  return { note }
}
export default connect(mapStateToProps, { updateNote, fetchNote })(UpdateNote)
