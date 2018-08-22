import {
  FETCH_NOTES,
  CLEAR_NOTES,
  CREATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE
} from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload
    case CREATE_NOTE:
      return action.payload
    case DELETE_NOTE:
      return action.payload
    case UPDATE_NOTE:
      return action.payload
    case CLEAR_NOTES:
      return []
    default:
      return state
  }
}
