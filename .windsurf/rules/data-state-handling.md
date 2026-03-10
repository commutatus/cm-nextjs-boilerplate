---
trigger: always_on
---
# Data State Handling (Loading, Empty, Error)

## Loading States
- Always handle loading states explicitly before rendering data.
- For `antd` `Table`, use the built-in `loading` prop — pass the loading state from the Apollo hook directly. Also update the locale to update the message instead of the default "Data is empty".
- For other components, show a loading indicator (e.g., `antd` `Spin` or `Skeleton`) while queries are in progress.
- Never render data-dependent UI until loading is complete.
- Use the loading state returned by Apollo hooks (`useQuery`, `useMutation`) — do not define separate loading state.

## Empty States
- After loading completes, check if data is empty before rendering.
- Use Ant Design's `Empty` component with a relevant icon to display empty state UI.
- Create reusable empty state components in `src/common/components/` (e.g., `EmptyState.tsx`).
- For `antd` `Table`, use the `locale` prop to customize the empty state with your `EmptyState` component instead of the default "No Data" message.

## Error Handling
- Use the `error` object returned by Apollo's `useQuery` hook to handle query errors.
- Display appropriate error UI when a query fails (e.g., an error message or retry option).
- For mutations, use the `notificationApi` from the `useGlobals` hook to show error notifications.
- Do not silently swallow errors — always inform the user when something fails.

## Order of Rendering
1. Show loading state while data is being fetched (for `Table`, use the `loading` prop).
2. Show error state if the query returned an error.
3. Show empty state if data is empty after loading (for `Table`, customize via `locale` prop).
4. Render the actual UI only when data is available.
