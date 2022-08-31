import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface isLoggedInState {
  isLoggedIn: boolean;
}

const initialState: isLoggedInState = {
  isLoggedIn: false,
};

export const isLoggedInSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setisLoggedInAsync: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {setisLoggedInAsync} = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
