import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import personReducer from './reducer/PersonReducer';
const store = createStore(personReducer,applyMiddleware(thunk));

export default store;