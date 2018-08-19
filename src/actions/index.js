import axios from 'axios'
const serverURL = 'http://localhost:5000'

import { FETCH_NOTES } from './types'

export const fetchNotes = () => async dispatch => {
  const token = localStorage.getItem('authorization')
  const res = await axios.get(`${serverURL}/api/notes`, {
    headers: { authorization: token }
  })
  dispatch({ type: FETCH_NOTES, payload: res.data }).catch(err =>
    console.log(err)
  )
}
