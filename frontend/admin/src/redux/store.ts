import React from 'react';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@redux/reducer';
import rootSaga from '@redux/sagas';
import { configureStore } from '@reduxjs/toolkit';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
