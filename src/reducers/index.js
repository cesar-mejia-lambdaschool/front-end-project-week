import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import noteReducer from './noteReducer'
import usernameReducer from './usernameReducer'
import singleReducer from './singleReducer'

const rootReducer = combineReducers({
  notes: noteReducer,
  note: singleReducer,
  username: usernameReducer,
  form: formReducer
})

export default rootReducer
