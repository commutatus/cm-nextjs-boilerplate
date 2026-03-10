---
trigger: always_on
---
# TypeScript

- Prefer types over `any`; use `unknown` + narrowing when you don't know a value shape.
- Keep types close to usage; define component prop types next to the component unless shared.
- Avoid implicit `any`; type function parameters and return types when inference isn't obvious.
- Do not use the Non-Null Assertion Operator (`!`) unless necessary.
- Avoid strings directly; use enums instead, especially if referenced in multiple places.
- Avoid using the `as` keyword.
