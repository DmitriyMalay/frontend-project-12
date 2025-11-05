import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    sending: false,
    error: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.items = action.payload;
    },
    addMessage: (state, action) => {
      state.items.push(action.payload);
    },
    setSending: (state, action) => {
      state.sending = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMessages, addMessage, setSending, setError } = messagesSlice.actions;

export default messagesSlice.reducer;