import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { removeMessagesByChannel } from './messagesSlice'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    currentChannelId: null,
  },
  reducers: {
    getChannels: (state, action) => {
      state.items = action.payload
      if (!state.currentChannelId && state.items.length > 0) {
        state.currentChannelId = state.items[0].id
      }
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
    addChannel: (state, action) => {
      state.items.push(action.payload)
    },
    removeChannel: (state, action) => {
      const channelIdToDelete = action.payload
      state.items = state.items.filter(channel => channel.id !== channelIdToDelete)

      if (state.currentChannelId === channelIdToDelete) {
        state.currentChannelId = state.items.length > 0 ? state.items[0].id : null
      }
    },
    renameChannel: (state, action) => {
      const channel = state.items.find(channel => channel.id === action.payload.id)
      if (channel) {
        channel.name = action.payload.name
      }
    },
  },
})

export const {
  getChannels, setCurrentChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions

export const deleteChannelWithServer = channelId => async (dispatch, getState) => {
  const { token } = getState().auth
  if (!token) return

  try {
    await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    dispatch(removeChannel(channelId))
    dispatch(removeMessagesByChannel(channelId))
  }
  catch (err) {
    console.error('Ошибка удаления канала:', err)
  }
}

export default channelsSlice.reducer
