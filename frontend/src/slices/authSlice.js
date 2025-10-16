// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { token } = action.payload
      state.token = token
      localStorage.setItem('auth', JSON.stringify({ token }))
    },
    logOut: (state) => {
      state.token = null
      localStorage.removeItem('auth')
    },
  },
})

export const { logIn, logOut } = authSlice.actions


export default authSlice.reducer