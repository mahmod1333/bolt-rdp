import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      server: {
        port: 5173,
        proxy: {
          '/socket.io': {
            target: 'ws://localhost:9000',
            ws: true,
            changeOrigin: true
          }
        }
      },
      resolve: {
        alias: {
          './runtimeConfig': './runtimeConfig.browser',
        },
      },
      optimizeDeps: {
        exclude: ['js-big-decimal']
      }
    })
