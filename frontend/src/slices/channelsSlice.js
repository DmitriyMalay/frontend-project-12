import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    currentChannelId: null,
  },
  reducers: {
    getChannels: (state, action) => {
      state.items = action.payload;
      if (!state.currentChannelId && state.items.length > 0) {
        state.currentChannelId = state.items[0].id;
      }
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },

  },
});

export const { getChannels, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;