import { combineReducers } from 'redux';
import reducer from './reducer';

const rootReducer = combineReducers({
  reducer: reducer,
});

import { createStore } from 'redux';

export const store = createStore(rootReducer);
