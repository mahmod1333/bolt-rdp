import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App'
    import './index.css'
    import { Provider } from 'react-redux'
    import { store } from './store/store'
    import { ThemeProvider, createTheme } from '@mui/material/styles';

    const theme = createTheme({
      palette: {
        primary: {
          main: '#008080',
        },
        secondary: {
          main: '#f44336',
        },
      },
    });

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </React.StrictMode>,
    )
