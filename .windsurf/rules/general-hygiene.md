---
trigger: always_on
---
# General Hygiene

## Code quality
- Keep changes scoped; don't mix refactors with feature/bugfix unless required.
- Delete unused functions/components instead of commenting them out.
- Match surrounding code style in the file you're editing.
- Write scalable, readable code; prefer descriptive code over succinct code.
- Do not duplicate code; extract common logic into functions, components, or custom hooks.
- Avoid writing custom code for complex operations; use external libraries instead.
- Use the `pluralize` package to handle pluralization of words based on quantity. If not already installed, install it.

## JavaScript style
- Avoid chaining ternary operators.
- Prefer `if` statements over ternary operators in JS code.
- Always use braces with `if` conditions.

## Styling
- Avoid inline styles.
- Use Tailwind as much as possible.
- Use `classNames` and `classNames/bind` for managing class names.
- Use `antd` components for UI instead of building custom components.
- Prefer `antd` layout/spacing patterns (e.g. `Space`, `Flex`, `Row`/`Col`) over ad-hoc CSS.
