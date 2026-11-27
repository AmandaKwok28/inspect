# Notes

Vite is a build tool that transforms TypeScript and React JSX into browser-compatible JavaScript and, through its Tailwind plugin, generates CSS from Tailwind classes.

It's responsible for starting a local development server via npm run dev, which transforms source code on demand and updates the application when files change.

It's also a bundler via npm run build, which resolves imports, combines dependencies, and produces optimized, browser-ready files.

This file configures how Vite develops and builds the project. It connects our build tool with the plugins we installed. These plugins extend Vite's functionality: the React plugin provides JSX transformation and React Fast Refresh, the Tailwind plugin generates CSS from utility classes, and CRXJS handles Chrome extension-specific bundling and manifest processing.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import manifest from "./manifest.json" with { type: "json" };

//
export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
});
```
