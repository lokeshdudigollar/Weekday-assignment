import { createStore } from 'redux';
//import rootReducer from './reducers';
import index from './reducer/index'



const store = createStore(index);

export default store;