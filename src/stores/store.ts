'use client';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { allreducers } from './allReducers';
import logger from 'redux-logger';
import { useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  key: 'root',
  version: 1,
  timeout: 10000,
  storage: sessionStorage,
  whiteList: ['auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, allreducers);
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        ignoredAction: ['persist/PERSIST', 'persist/REHYDRATE'],
      }).concat(logger),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
