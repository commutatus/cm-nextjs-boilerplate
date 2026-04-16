---
name: ai-comments-fix
description: Iterate over locally saved review comments and PR feedback, apply fixes, and update the comments file
---

## Goal

Read the local comments file and drive an interactive Fix/Wontfix loop until all actionable items are resolved.

This skill must:

- Read `.windsurf/workflows/outputs/review-comments.md`
- Process all items regardless of `Source` (both `local` and `github` items)
- For each item with status `open`, ask the user whether to **Fix** or **Wontfix** (Wontfix requires a reason)
- If fixing, implement the code change using edit tools
- Update the markdown file in-place to reflect current status
- Use the `Source` column to distinguish between local AI findings and GitHub PR comments (this affects downstream steps but not the fix logic)

## Step 1: Load Comments

Open and parse:

- `.windsurf/workflows/outputs/review-comments.md`

Follow the canonical schema in:

`docs/workflows/review-comments.schema.md`

If the file does not exist or has no actionable items, tell the user and stop.

## Step 2: Iterate

For each item in order:

1. Restate the item (file, location, title, body)
2. Ask the user using `ask_user_question`:
   - **Fix**: Apply a fix
   - **Wontfix**: Keep as-is (user must provide a reason)

If the user selects **Fix**:

- Read the relevant file(s)
- Make the smallest correct change
- Ask the user to **Accept** or **Reject** the change
- If accepted, mark the item as `fixed` in the markdown file
- If rejected, keep the item as `open` and immediately ask the user what to do next: either retry with a different fix, apply the fix manually and confirm, or mark as `wontfix` with a reason

If the user selects **Wontfix**:

- Ask the user for a reason
- Record the reason in the markdown file

## Step 3: Stop Condition

Continue until there are no remaining items with status `open`.

## Output File Updates

Maintain a table under `## Items` with these canonical columns (per `docs/workflows/review-comments.schema.md`):

- `#`
- `Status` (open | fixed | wontfix)
- `Source` (local | github)
- `Kind` (inline | general)
- `Severity` (blocker | major | minor | nit)
- `File`
- `Location`
- `Title`
- `Body`
- `Author`
- `ThreadId`
- `CommentId`
- `Notes`

Always overwrite the entire file when updating it.

When updating items, preserve all existing columns from the canonical schema, especially `ThreadId` and `CommentId`.
