import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = '';
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
