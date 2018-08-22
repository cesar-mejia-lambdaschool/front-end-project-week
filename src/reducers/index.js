import { combineReducers } from 'redux'

import noteReducer from './noteReducer'
import usernameReducer from './usernameReducer'
import singleReducer from './singleReducer'

const rootReducer = combineReducers({
  notes: noteReducer,
  note: singleReducer,
  username: usernameReducer
})

export default rootReducer
