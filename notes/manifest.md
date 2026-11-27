# Notes on Manifest

the manifest is the config file that tells chrome what our extension is, which scripts to
execute, and how users can interact with it.

### Metadata

```json
{
  // latest chrome extension architecture supported by the browser
  "manifest_version": 3,
  "name": "Inspect",

  // The version of our app, this is arbitrary and something you increment as you develop
  "version": "0.1.0",
  "description": "A visual Tailwind design inspector"
}
```

### Action

Defines our extension's toolbar action. When we leave it empty, turning on the extension
doesn't create things like a popup. Instead for this project, we handle it programmatically
since our project is a tooltip.

```json
{
  "action": {}
}
```

### Background

Tells chrome which script to register as our background service worker. A service worker is an
event-driven background script that operates independently of the webpage. Chrome can
start it when an event occurs and terminate it when it's idle.

```json
{
  "background": {
    "service_worker": "src/background.ts",

    // allows service worker to use ESM imports and exports
    "type": "module"
  }
}
```

### Content Scripts

Tells chrome which scripts to inject into webpages. This was removed so that we don't auto-inject
js into every website we visit. Replaced with permissions field so that js is only injected
if we actually activate the chrome extension.

- `matches` defines which URLs qualify for injection, currently we're matching all http and https
  websites
- `js` identifies scripts to inject. content scripts have access to the webpage DOM unlike our
  service worker

```json
{
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
      "js": ["src/content.tsx"]
    }
  ]
}
```

### Commands

Registers a keyboard shortcut for our extension. `_execute_action` is a reserved Chrome command
that triggers the extension's toolbar action, effectibley behaving as though we clicked the
extension icon

```json
{
  "commands": {
    "_execute_action": {
      "suggested_key": {
        // Alt and option are the same on Mac apparently
        "default": "Alt+Shift+I",
        "mac": "Alt+Shift+I"
      }
    }
  }
}
```

### Permissions

Declares which additional chrome capabilities our extension needs access to. `activeTab`
grants temporary access to the current webpage when the user explicitly activate inspect by
clicking on its icon or using its keyboard shortcut. `scripting` allows us to programatically
inject JS into a webpage we have permission to acces using chrome.scripting.executeScript()

Together, they allow us to inject our content script on demand rather than automatically into every
website the user visits.

```

```
