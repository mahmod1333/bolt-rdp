import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
      screenData: null,
      mousePosition: null,
      clickPosition: null,
      touchPosition: null,
      touchMovePosition: null,
      keyboardInput: null,
      langType: null,
    }

    export const screenSlice = createSlice({
      name: 'screen',
      initialState,
      reducers: {
        setScreenData: (state, action) => {
          state.screenData = action.payload
        },
        setMousePosition: (state, action) => {
          state.mousePosition = action.payload
        },
        setClickPosition: (state, action) => {
          state.clickPosition = action.payload
        },
        setTouchPosition: (state, action) => {
          state.touchPosition = action.payload
        },
        setTouchMovePosition: (state, action) => {
          state.touchMovePosition = action.payload
        },
        setKeyboardInput: (state, action) => {
          state.keyboardInput = action.payload
        },
        setLangType: (state, action) => {
          state.langType = action.payload
        },
      },
    })

    export const { setScreenData, setMousePosition, setClickPosition, setTouchPosition, setTouchMovePosition, setKeyboardInput, setLangType } = screenSlice.actions

    export default screenSlice.reducer
