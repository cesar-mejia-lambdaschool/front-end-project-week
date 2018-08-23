import { FETCH_NOTE, CLEAR_NOTE } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NOTE:
      return action.payload
    case CLEAR_NOTE:
      return action.payload
    default:
      return state
  }
}
