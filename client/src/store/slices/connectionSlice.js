import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
      isConnected: false,
      roomId: null,
      error: null,
    }

    export const connectionSlice = createSlice({
      name: 'connection',
      initialState,
      reducers: {
        setConnected: (state, action) => {
          state.isConnected = action.payload
        },
        setRoomId: (state, action) => {
          state.roomId = action.payload
        },
        setError: (state, action) => {
          state.error = action.payload
        },
      },
    })

    export const { setConnected, setRoomId, setError } = connectionSlice.actions

    export default connectionSlice.reducer
