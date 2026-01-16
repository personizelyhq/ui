# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personizely UI is a Vue 3 component library based on Reka UI, styled with Tailwind CSS v4. Components are registered with a `Ui` prefix (e.g., `UiButton`, `UiInput`).

## Commands

```bash
# Build the library
npm run build

# Run linting
npm run lint
npm run lint:fix

# Type checking
npm run vue-typecheck

# Generate web-types for IDE support
npm run build:web-types

# Documentation dev server
npm run docs:dev

# Build documentation
npm run docs:build
```

## Architecture

### Component Structure

Components live in `src/components/ui/<component-name>/`:
- `<ComponentName>.vue` - Main component file
- `index.ts` - Exports and variant definitions using `class-variance-authority`
- `use<Feature>.ts` - Optional composables (e.g., `useToast.ts`, `useAlertDialog.ts`)

### Styling Pattern

- Components use `class-variance-authority` (CVA) for variant-based styling
- The `cn()` utility from `src/utils/tailwind.ts` merges Tailwind classes (uses `clsx` + `tailwind-merge`)
- CSS variables for theming are defined in `src/assets/index.css` (supports light/dark modes)
- Tailwind v4 configuration in `tailwind.config.ts` with animations plugin

### Key Dependencies

- **Reka UI**: Headless component primitives for accessibility
- **vee-validate**: Form validation (peer dependency)
- **@vueuse/core**: Vue composition utilities
- **lucide-vue-next**: Icon library

### Entry Point

`src/index.ts` exports all components and composables. The library can be:
- Installed as a Vue plugin via `app.use(PersonizelyUI, options)`
- Tree-shaken by importing individual components

### Global Options

`src/options-provider.ts` manages global config (e.g., `portalTo` for overlay positioning).

## Code Style

- 2-space indentation, no semicolons, single quotes
- Vue SFC block order: `<template>`, `<script>`, `<style>`
- Max 3 attributes per line for single-line elements
- Prefix unused variables with underscore (`_`)
