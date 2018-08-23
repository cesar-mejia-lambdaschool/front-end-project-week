import axios from 'axios'
import {
  FETCH_NOTES,
  FETCH_NOTE,
  SET_USERNAME,
  CLEAR_NOTES,
  CLEAR_USERNAME,
  CREATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE
} from './types'

const serverURL = 'https://lambda-notes-apiserver.herokuapp.com'

export const fetchNotes = () => async dispatch => {
  const token = localStorage.getItem('authorization')

  const res = await axios.get(`${serverURL}/api/notes`, {
    headers: { authorization: token }
  })
  dispatch({ type: FETCH_NOTES, payload: res.data.notes })
  dispatch({ type: SET_USERNAME, payload: res.data.username })
}

export const fetchNote = id => async dispatch => {
  const token = localStorage.getItem('authorization')

  const res = await axios.get(`${serverURL}/api/notes/${id}`, {
    headers: { authorization: token }
  })
  dispatch({ type: FETCH_NOTE, payload: res.data })
}
export const createNote = note => async dispatch => {
  const token = localStorage.getItem('authorization')

  const res = await axios.post(`${serverURL}/api/notes`, note, {
    headers: { authorization: token }
  })
  console.log('res.data: ', res.data)
  dispatch({ type: CREATE_NOTE, payload: res.data })
}

export const deleteNote = id => async dispatch => {
  const token = localStorage.getItem('authorization')

  const res = await axios.delete(`${serverURL}/api/notes/${id}`, {
    headers: { authorization: token }
  })
  console.log('delete data', res.data)
  dispatch({ type: DELETE_NOTE, payload: res.data })
}

export const updateNote = note => async dispatch => {
  const token = localStorage.getItem('authorization')

  const res = await axios.put(`${serverURL}/api/notes/${note.id}`, note, {
    headers: { authorization: token }
  })
  dispatch({ type: UPDATE_NOTE, payload: res.data })
}
export const clearState = () => dispatch => {
  dispatch({ type: CLEAR_NOTES, payload: [] })
  dispatch({ type: CLEAR_USERNAME, payload: '' })
}
