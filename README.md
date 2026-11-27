# Inspect

A lightweight Chrome extension for inspecting, measuring, and modifying elements directly on a webpage.

Sometimes I just want to know the font size of a heading, the padding inside a button, or the spacing between two elements without having to google the tailwind class equivalent. Inspect makes that information accessible directly on the page.

https://github.com/user-attachments/assets/da860ce9-b105-433b-91ea-741d1c4984a1

## Features

### Style inspection

Hover over any HTML element to view its dimensions and computed styles as inferred Tailwind CSS utilities. Inspect provides information about typography, spacing, layout, and appearance without requiring you to open DevTools.

The suggested utilities are derived from computed CSS rather than the element's original class names, so Inspect also works on websites that do not use Tailwind.

### Spacing measurements

Click an element to lock your selection, then hover over another element to measure the horizontal or vertical distance between their edges.

Inspired by Figma's measurement functionality, this makes it easier to reference existing layouts and maintain consistent spacing across components.

### Live modifications

Experiment with typography and spacing directly on the webpage. Modifications are applied locally and can be reset to restore the element's original inline styles.

### Appearance

Switch between light and dark themes through the Settings tab. Preferences are stored locally and persist across browser sessions.

## Usage

Activate Inspect by clicking the extension icon or using the keyboard shortcut.

| Action             | Input                                   |
| ------------------ | --------------------------------------- |
| Toggle inspection  | Alt / Option + Shift + I                |
| Inspect an element | Hover                                   |
| Lock an element    | Click                                   |
| Measure spacing    | Hover over another element while locked |
| Unlock selection   | Esc                                     |
| Exit inspection    | Q                                       |

## Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd inspect
npm install
npm run build
```

Navigate to `chrome://extensions`, enable Developer mode, select **Load unpacked**, and choose the generated `dist` directory.

For local development:

```bash
npm run dev
```

## Implementation

Inspect is built with TypeScript, React, Tailwind CSS, Vite, and the Chrome Extensions API.

The extension uses Manifest V3 and injects its content script on demand rather than running continuously on every webpage.

The tooltip and measurement overlay use Shadow DOM to isolate their interfaces from the host webpage's styles. Element properties are retrieved through `getComputedStyle()`, while spacing measurements are calculated using `getBoundingClientRect()`.

Browser zoom is accounted for when positioning and scaling the inspector's interface.

## Project structure

```text
src/
├── background.ts       # Extension service worker
├── content.tsx         # Content script entry point
├── App.tsx             # Inspector interface
├── components/         # Tooltip and panel components
├── hooks/              # React-specific logic
├── constants/          # Shared configuration
└── lib/
    ├── inspection/     # State, events, and lifecycle
    ├── measurement/    # Geometry and rendering
    ├── tailwind/       # CSS-to-Tailwind conversion
    ├── editor.ts       # CSS modifications and reset
    ├── inspector.ts    # Element properties
    ├── overlay.ts      # Element highlighting
    ├── tooltip.ts      # Tooltip initialization and positioning
    └── settings.ts     # Persistent preferences
```

## Privacy

Inspect runs entirely in the browser. It does not require a backend, an account, or an external API. Inspection data stays on the device, and user preferences are stored using Chrome's local storage API.

## Limitations

Tailwind utilities are inferred from computed CSS values using default Tailwind conventions. They may not correspond exactly to a website's original utilities or custom design tokens.

Spacing measurements represent rendered distances between element bounding boxes rather than the underlying CSS properties responsible for those distances.
