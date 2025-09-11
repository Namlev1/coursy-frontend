import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/types/enums';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: Role | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      { payload: { user, role } }: PayloadAction<{ user: User; role: Role }>
    ) => {
      state.user = user;
      state.role = role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
