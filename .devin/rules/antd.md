---
trigger: model_decision
description: Apply for every request related to Ant Design (antd), including questions, implementation, debugging, styling, and component APIs.
---

# Ant Design (antd)

- Prefer `antd` components for common UI patterns.
- Use `antd` layout/spacing patterns (e.g., `Space`, `Flex`, `Row`/`Col`) over ad-hoc CSS.
- For detailed component APIs, use `.devin/docs/antd/llms.txt` and `.devin/docs/antd/llms-full.txt` for comprehensive documentation.

## Auto-Focus in Modals

`autoFocus` on antd inputs inside a `Modal` does **not** work reliably. antd's dialog steals focus to its own wrapper `div[tabindex="0"]` after the input mounts, overriding `autoFocus`.

**Rule:** For any `Modal` that contains at least one text input as its primary interaction (not confirmation-only modals), always auto-focus the first eligible input using the `afterOpenChange` prop + a `ref`.

Create a `useModalAutoFocus` hook in the project's shared hooks directory if it doesn't already exist:

```ts
import { useRef } from "react";

const useModalAutoFocus = <T extends { focus: () => void }>() => {
  const focusRef = useRef<T>(null);

  const onAfterOpenChange = (open: boolean) => {
    if (open) {
      focusRef.current?.focus();
    }
  };

  return { focusRef, onAfterOpenChange };
};

export default useModalAutoFocus;
```

Usage:

```ts
const { focusRef, onAfterOpenChange } = useModalAutoFocus<InputRef>();
```

- Pass `onAfterOpenChange` to the `Modal`'s `afterOpenChange` prop.
- Pass `focusRef` as `ref` to the first input in the modal.
- Do **not** use `autoFocus` prop on inputs inside modals — it is unreliable.
- Do **not** use DOM selectors (e.g. `querySelector`) to find and focus inputs — it is brittle.
- When the first input is dynamic (rendered conditionally or from a list), compute which item is first outside the JSX and pass `ref` only to that one item explicitly.

**Eligible modals:** any modal where the primary action is filling in data (text inputs, search fields). Skip confirmation-only modals and modals that open on a `Select` or `Checkbox` as the first element.

## Auto-Focus in Dropdowns (Select / Dropdown with search input)

When a `Select` or `Dropdown` renders a custom search `Input` inside its `dropdownRender`/`popupRender`, the `autoFocus` prop on the `Input` does **not** work reliably. The antd trigger steals focus back after the dropdown opens.

**Rule:** Any `Select` or `Dropdown` that includes a search input inside its dropdown content must auto-focus that input when the dropdown opens. Use `requestAnimationFrame` to defer the focus call until after the browser finishes painting and the trigger releases focus.

Create a `useDropdownSearchFocus` hook in the project's shared hooks directory if it doesn't already exist:

```ts
import { useRef } from "react";

export const useDropdownSearchFocus = <T extends { focus: () => void }>() => {
  const searchInputRef = useRef<T>(null);

  const onDropdownVisibleChange = (open: boolean) => {
    if (open) {
      // requestAnimationFrame defers focus until after the browser finishes
      // painting and the Select/Dropdown trigger releases focus
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  };

  return { searchInputRef, onDropdownVisibleChange };
};
```

Usage for `Select`:

```tsx
const { searchInputRef, onDropdownVisibleChange } = useDropdownSearchFocus<InputRef>();

<Select
  dropdownRender={(menu) => (
    <>
      <Input ref={searchInputRef} ... />
      {menu}
    </>
  )}
  onDropdownVisibleChange={onDropdownVisibleChange}
/>
```

Usage for `Dropdown`:

```tsx
const { searchInputRef, onDropdownVisibleChange } = useDropdownSearchFocus<InputRef>();

<Dropdown
  dropdownRender={() => (
    <>
      <Input ref={searchInputRef} ... />
      {/* menu content */}
    </>
  )}
  onOpenChange={onDropdownVisibleChange}
/>
```

**Special cases:**

- **Controlled `open` prop:** If the dropdown uses a controlled `open` state (e.g. `open={isOpen}`) without an `onOpenChange`/`onDropdownVisibleChange` prop, call `onDropdownVisibleChange(true)` directly wherever `isOpen` is set to `true` (e.g. in an `onClick` handler or a `useEffect` that watches the open flag).

- Do **not** use `autoFocus` on inputs inside dropdown content — it is unreliable.
- Do **not** use `setTimeout` for deferral — use `requestAnimationFrame` instead for frame-accurate timing.

## Date Formatting

- Always use a single shared constant for human-readable date formats. Do not hardcode `dayjs` format strings inline across files.
- Define the constant in a shared utility file (e.g. `src/common/utils/date.ts`) and import it wherever dates are formatted for display.
- The standard human-readable date format is `"D MMMM, YYYY"` (e.g. `"29 June, 2026"`). Use this for all date-only displays.
- Do **not** mix different format strings (`"DD MMM YYYY"`, `"MMM D, YYYY"`, `"MMMM D, YYYY"`, etc.) across components — standardize all human-readable dates through the shared constant.
- Use `ConfigProvider`'s `datePicker` and `rangePicker` component config props (supported since antd v5.7.0) to set the default `format` globally — this avoids repeating the `format` prop on every individual `DatePicker` or `RangePicker`. Set this at the root `ConfigProvider`:

```tsx
import { DATE_FORMAT } from "@/common/utils/date";

<ConfigProvider
  datePicker={{ format: DATE_FORMAT }}
  rangePicker={{ format: DATE_FORMAT }}
>
  <App />
</ConfigProvider>;
```

- Only override `format` on an individual `DatePicker` when a specific screen genuinely requires a different format (e.g. a year-only or month-only picker).

## Number Formatting

- Always display large numbers (counts, totals, pagination) with locale-aware thousand separators. Use `Intl.NumberFormat` with the user's browser locale (`navigator.languages[0]`) and force `numberingSystem: "latn"` to keep western digits. Memoize the formatter instance.
