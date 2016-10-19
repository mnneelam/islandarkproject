import { combineReducers } from 'redux'
import media from './media'
import userLocation from './userLocation'
import userIsLoggedIn from './userIsLoggedIn'
import loginDetails from './loginDetails'

const iapApp = combineReducers({
  media,
  userLocation,
  userIsLoggedIn,
  loginDetails
})

export default iapApp
