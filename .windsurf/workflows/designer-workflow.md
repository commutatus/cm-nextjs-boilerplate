---
description: UI/UX designer workflow for working on layouts using AntD in a Next.js project
---

# Designer Workflow — Ant Design

## Prerequisites

- Node.js installed (managed via asdf, see `.tool-versions`)
- Dependencies installed: `npm install`

## Creating a New Component

2. Create a component file at `src/components/<category>/<ComponentName>.tsx`:
   - Import AntD components as needed (`import { Button, Card, ... } from 'antd'`)
   - Use `theme.useToken()` for all spacing/color values — no inline styles with hardcoded values
   - Export the component as default

## Project Structure

```
src/
  components/
    ui/              # Primitives (Button wrappers, Cards, Inputs)
    layouts/         # Page-level layout components
    features/        # Feature-specific composed components
  app/               # Next.js App Router pages
```

## Theming

- To change the global theme, edit the `token` object (colors, borderRadius, fontFamily, etc.)
- Use `theme.useToken()` in components to access token values
- See full token list: https://ant.design/docs/react/customize-theme#seedtoken

## Style Rules

- **No inline styles with hardcoded values** — use AntD tokens via `theme.useToken()`
- **No CSS files or Tailwind classes** for AntD components
- Use AntD's `Card`, `Flex`, `Space`, `Layout` components for structure
- Use AntD's `Row`/`Col` grid system for responsive layouts
