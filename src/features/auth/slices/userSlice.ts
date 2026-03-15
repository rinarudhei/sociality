import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  name: '',
  username: '',
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
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.profilePhoto = action.payload.profilePhoto;
      state.role = action.payload.role;
    },
    clearCurrentUser: (state) => {
      state.id = 0;
      state.name = '';
      state.username = '';
      state.email = '';
      state.phone = '';
      state.profilePhoto = '';
      state.role = '';
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
