---
trigger: model_decision
description: Before implementing new features, scan the existing codebase for reusable patterns, components, hooks, and utilities to avoid duplication.
---
# Code Reuse & Pattern Detection

## Before Writing New Code
- Before implementing a new feature, scan the existing codebase for:
  - Shared components in `src/common/components/`
  - Custom hooks in `src/common/hooks/` or feature modules in `src/modules/`
  - Utility functions and helpers
  - Context providers in `src/common/context/`
  - Constants and enums in `src/common/constants/`
- If a similar pattern, component, or utility already exists, extend or reuse it instead of creating a new one.

## When to Extract
- Only suggest extracting shared code when:
  - The same logic or UI pattern is used in **2 or more places**.
  - The user explicitly asks to refactor or clean up.
  - The new feature closely mirrors an existing feature's structure.
- Do **not** preemptively extract code that is only used once.

## How to Communicate
- If you find existing reusable code, mention it before implementing (e.g., "Found `useTablePagination` hook that can be reused here.").
- If you identify a pattern that **could** be extracted but isn't yet, briefly suggest it and let the user decide — do not extract automatically.
- Keep suggestions concise; do not over-engineer or refactor beyond what the user asked for.

## Scope
- This rule applies when building new features or prototyping from scratch.
- Do not apply this rule for small bug fixes or one-off changes.
