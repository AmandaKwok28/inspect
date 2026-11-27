# Notes

This file describes what package.json is and what each field represents. Package.json defines
the project's metadata, dependencies, and development commands (CLI).

# Project Metadata Fields

```json
{
  "name": "inspect",

  // means we won't accidently publish to npm
  // doesn't affect our ability to publish to chrome web store
  "private": true,
  "version": "0.0.0",

  // tells Node to treat .js files as ECMAScript modules (ESM) which use
  // `import` and `export`` instead of the CommonJS require()
  "type": "module"
}
```

# Scripts

All scripts are prefixed with `npm run`. E.g. `npm run dev` is the first CLI command

```json
{
  "scripts": {
    // starts Vite development server
    "dev": "vite",

    // runs ts build mode and bundles the extension for prod
    "build": "tsc -b && vite build",

    // checks code for linting violations
    "lint": "eslint ."
  }
}
```

# Dependencies

These are libraries our project uses at runtime. React handles the components, state, hooks, and
UI updates. React-dom connects React to the browser's DOM. For e.g., we use its createRoot()
to mount our tooltip inside a shadow DOM (in independent DOM tree from the main page you're on).

```json
{
  "dependencies": {
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  }
}
```

# Dev Dependencies

These packages support development, compilation, and code quality rather than libraries our
extension specifically needs.

- Build tools
  - vite
  - typescript
  - crxjs/vite-plugin
  - vitejs/plugin-react
  - tailwindcss
  - tailwindcss/vite

- type definitions - these inform TS server and linting about what functions, properties,
  parameters, and return types an external API provides you
  - types/chrome
  - types/node
  - types/react
  - types/react-dom

- linting
  - eslint
  - eslint/js
  - typescript-eslint
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh
  - globals

```json
{
  "devDependencies": {
    // extends vite to support chrome extensions
    "@crxjs/vite-plugin": "^3.0.0",

    "@eslint/js": "^10.0.1",

    // integrates tailwind into vite's build pipeline
    "@tailwindcss/vite": "^4.3.5",
    "@types/chrome": "^0.3.8",
    "@types/node": "^26.6.6",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",

    // adds react and jsx support to Vite
    "@vitejs/plugin-react": "^6.3.0",
    "eslint": "^10.15.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.8",
    "globals": "^17.14.0",
    "tailwindcss": "^4.3.5",
    "typescript": "~6.0.3",
    "typescript-eslint": "^8.73.0",
    "vite": "^8.4.0"
  }
}
```
