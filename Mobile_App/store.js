import { combineReducers } from 'redux';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import {loginReducer} from './Reducers/loginReducer';



const myReducers=combineReducers({
 loginReducer
})


const store=createStore(
  myReducers,
  applyMiddleware(thunk)
)
export default store;
