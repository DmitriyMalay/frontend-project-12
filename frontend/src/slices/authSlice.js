import { createSlice } from '@reduxjs/toolkit';

const loadAuthData = () => {
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      return {
        token: parsed.token || null,
        username: parsed.username || null,
      };
    }
  } catch (e) {
    console.warn('Failed to parse auth from localStorage');
    return null;
  }
  return { token: null, username: null };
};

const initialState = loadAuthData();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      localStorage.setItem('auth', JSON.stringify({ token, username }));
    },
    logOut: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
