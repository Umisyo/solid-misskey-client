import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import fs from 'fs'

export default defineConfig({
  plugins: [
    solid({
      adapter: 'solid-start-vercel'
    })
  ],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem')
    }
  }
})
