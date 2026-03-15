import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['god-love-admin.deployment.cc'],
    historyApiFallback: true,
    proxy: {
      // '/admin-auth': 'http://18.204.175.233:3001',
      // '/admin': 'http://18.204.175.233:3001',
      '/admin-auth': 'https://god-love-api.deployment.cc',
      '/admin': 'https://god-love-api.deployment.cc',
    }
  },
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })