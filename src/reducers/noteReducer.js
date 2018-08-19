import {
  FETCH_NOTES,
  FETCH_NOTE,
  CREATE_NOTE,
  READ_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE
} from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload
    default:
      return state
  }
}
