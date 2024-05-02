import { combineReducers } from 'redux';
import ApiReducer from './ApiReducer';

const rootReducer = combineReducers({
    weekdayapi: ApiReducer,
    // Add more reducers here
  });
  
  export default rootReducer;