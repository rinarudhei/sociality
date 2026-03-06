import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  profilePhoto: '',
  role: 'USER',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<typeof initialState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.profilePhoto = action.payload.profilePhoto;
      state.role = action.payload.role;
    },
    clearCurrentUser: (state) => {
      state.id = 0;
      state.name = '';
      state.email = '';
      state.phone = '';
      state.profilePhoto = '';
      state.role = '';
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
