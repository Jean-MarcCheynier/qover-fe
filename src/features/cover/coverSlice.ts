import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CatalogItem, CatalogMap } from '../../@types/Catalog';
import { AppThunk } from '../../app/store';

import { getAllCover } from './coverAPI';
import { CoverFormValues } from './CoverForm';

export interface CoverState {
  catalogMap: CatalogMap;
  details?: CoverFormValues;
  status: 'idle' | 'loading' | 'failed';
}

const getInitialState = (): CoverState => ({
  catalogMap: {},
  status: 'idle',
});

export const getCoverAsync = createAsyncThunk(
  'auth/login',
  async () => {
    const response = await getAllCover();
    const catalogMap: CatalogMap = response.data.reduce((acc: CatalogMap, item: CatalogItem) => {
      // eslint-disable-next-line no-underscore-dangle
      const key: string = item._id;
      acc[key] = item;
      return acc;
    }, {});
    return catalogMap;
  },
);

export const coverSlice = createSlice({
  name: 'cover',
  initialState: getInitialState,
  reducers: {
    reset: () => getInitialState(),
    setDetails: (state, action) => ({ ...state, details: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoverAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCoverAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.catalogMap = action.payload;
      });
  },
});

export const { reset, setDetails } = coverSlice.actions;

export const getCoverDetails = (values: CoverFormValues): AppThunk => (dispatch) => {
  dispatch(setDetails(values));
};

export default coverSlice.reducer;
