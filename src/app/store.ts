import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coverReducer from '../features/cover/coverSlice';
import authReducer from '../features/auth/authSlice';
import QoverAPI from './axios';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cover: coverReducer,
  },
});

QoverAPI.initInterceptor(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
