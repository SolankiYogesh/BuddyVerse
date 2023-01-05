import {configureStore} from '@reduxjs/toolkit';
import appReducers from '../reducers/index';
import {useDispatch} from 'react-redux';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    'authentication',
    'ScreenStyles',
    'shopData',
    'feedData',
    'userData',
    'getScoailUsers',
  ],
};

const rootReducer = (state: ReturnType<typeof appReducers>, action: any) => {
  //   if (action.type === 'USER_LOGOUT') {
  //     state = undefined;
  //   }
  return appReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      immutableCheck: {
        ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
      },
    }),
  // .concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type appStateType = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
