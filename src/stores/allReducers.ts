import { combineReducers } from '@reduxjs/toolkit';
import authReducers from '@/features/auth/slices/authSlice';
import userReducers from '@/features/auth/slices/userSlice';

export const allreducers = combineReducers({
  auth: authReducers,
  user: userReducers,
});
