import { SET_USERNAME, CLEAR_USERNAME } from '../actions/types'

export default (state = '', action) => {
  switch (action.type) {
    case SET_USERNAME:
      return action.payload
    case CLEAR_USERNAME:
      return ''
    default:
      return state
  }
}
