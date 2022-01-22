import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../@types/user';
import { RootState } from '../../app/store';
import { login, LoginPayload } from './authAPI';

export interface AuthState {
  user?: User;
  status: 'idle' | 'loading' | 'failed';
}

const getInitialState = (): AuthState => ({
  status: 'idle',
});

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginPayload: LoginPayload) => {
    const response = await login(loginPayload);
    return response.data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState,
  reducers: {
    reset: () => getInitialState(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
