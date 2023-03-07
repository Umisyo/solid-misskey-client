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
          key: fs.readFileSync('./localhost+2-key.pem'),
          cert: fs.readFileSync('./localhost+2.pem')
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
