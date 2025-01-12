import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
      userName: null,
      userAvatar: null,
    }

    export const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
        setUserName: (state, action) => {
          state.userName = action.payload
        },
        setUserAvatar: (state, action) => {
          state.userAvatar = action.payload
        },
      },
    })

    export const { setUserName, setUserAvatar } = userSlice.actions

    export default userSlice.reducer
