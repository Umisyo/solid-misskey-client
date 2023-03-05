import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import fs from 'fs'

export default defineConfig(({ command }) => {
  if (command && command === 'serve') {
    return {
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
    }
  }
  return {
    plugins: [
      solid({
        adapter: 'solid-start-vercel'
      })
    ]
  }
})
