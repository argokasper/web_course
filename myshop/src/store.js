import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});
