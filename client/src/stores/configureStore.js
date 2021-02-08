import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // allow async actions

// import all reducers
import { AppReducers } from '../stores'
const configureStore = () =>
  createStore(combineReducers({ ...AppReducers }), applyMiddleware(thunk))
export default configureStore
