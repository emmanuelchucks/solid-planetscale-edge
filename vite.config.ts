import cloudflarePages from "solid-start-cloudflare-pages"
import solid from "solid-start/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    solid({
      adapter: cloudflarePages({
        envPath: true,
      }),
    }),
  ],
})
