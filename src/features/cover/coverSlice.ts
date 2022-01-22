import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Catalog } from '../../@types/Catalog';

import { getAllCover } from './coverAPI';

export interface CoverState {
  catalog: Catalog;
  status: 'idle' | 'loading' | 'failed';
}

const getInitialState = (): CoverState => ({
  catalog: [],
  status: 'idle',
});

export const getCoverAsync = createAsyncThunk(
  'auth/login',
  async () => {
    const response = await getAllCover();
    return response.data;
  },
);

export const coverSlice = createSlice({
  name: 'cover',
  initialState: getInitialState,
  reducers: {
    reset: () => getInitialState(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoverAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCoverAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.catalog = action.payload;
      });
  },
});

export default coverSlice.reducer;
