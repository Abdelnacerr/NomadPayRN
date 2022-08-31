import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface tokenState {
  jwt: string;
}

const initialState: tokenState = {
  jwt: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenAsync: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
  },
});

export const {setTokenAsync} = tokenSlice.actions;

export default tokenSlice.reducer;
