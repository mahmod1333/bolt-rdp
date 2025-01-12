import { configureStore } from '@reduxjs/toolkit'
    import connectionReducer from './slices/connectionSlice'
    import screenReducer from './slices/screenSlice'
    import userReducer from './slices/userSlice'

    export const store = configureStore({
      reducer: {
        connection: connectionReducer,
        screen: screenReducer,
        user: userReducer,
      },
    })
