import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../middlewares/logger';

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);
  
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);
  
    const store = createStore(rootReducer, preloadedState, composedEnhancers);
  
    return store
}