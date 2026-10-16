---
trigger: glob
globs: "**/*.ts, **/*.tsx, **/*.js, **/*.jsx"
---

# External API Usage

## When Using External APIs

- **Always implement a fallback mechanism** when integrating third-party/external APIs. External services can become unavailable, change their response format, or rate-limit requests.
- **Prefer internal data sources** when available. If the project already has its own data (e.g., location data, postal codes), use that instead of fetching from external APIs.
- **Document the API source** with a comment or ticket reference explaining why this external API is needed and where it came from.

## Fallback Strategies

- The application must continue to function smoothly when an external API fails. The specific fallback approach depends on the feature requirements — it may involve using default values, skipping non-critical functionality, showing user-friendly error messages, or alternative data sources.
- Handle API failures explicitly with try-catch or error boundaries — do not let errors bubble up silently or crash the UI.
- Always provide a user-facing message when a feature is degraded due to API failure, so users understand what happened and what they can still do.

## Before Adding a New External API

- Verify if the project already has equivalent internal data
- Check if there's an existing ticket or requirement driving the API integration
- Ensure the API is reliable and has proper uptime/SLA guarantees
- Consider rate limits and authentication requirements

## Example Pattern

```typescript
// Bad: No fallback, direct dependency on external API
const response = await fetch('https://external-api.com/pincode/123456');
const data = await response.json();
setLocation(data);

// Good: With fallback and error handling
async function getLocationData(pincode: string): Promise<LocationData | null> {
  try {
    const response = await fetch(`https://external-api.com/pincode/${pincode}`);
    if (!response.ok) throw new Error('External API failed');
    return await response.json();
  } catch (error) {
    // Feature-dependent fallback: show error, allow manual entry, or use defaults
    showNotification('Location service unavailable. Please enter details manually.');
    return null;
  }
}
