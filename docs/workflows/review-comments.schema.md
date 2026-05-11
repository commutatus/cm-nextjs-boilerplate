---
description: Canonical schema for review comments files used by review-and-fix workflow and skills
---

# Review Comments Schema

This document defines the canonical markdown schema for review comment files produced/consumed by:

- `.windsurf/workflows/review-and-fix.md`
- `.windsurf/skills/ai-code-review`
- `.windsurf/skills/fetch-pr-comments`
- `.windsurf/skills/ai-comments-fix`

## Files

- `.windsurf/outputs/review-and-fix/review-comments.md` — review comments for the current workflow pass

## Required Frontmatter Section

The file must start with:

```markdown
# Review Comments

**GeneratedAt**: <timestamp>
```

Optionally, you may include:

- `**Branch**: <branch_name>` — the branch being reviewed
- `**Base**: <base_branch>` — the base branch for comparison
- `**PR**: <pr_number>` — if reviewing an existing PR

### Per-Item Source Discriminator

The `Source` column in the Items table is the primary discriminator:

- `local` — AI-generated review findings
- `github` — GitHub PR comments (inline or general)

Downstream steps use `Source` (not file-level `Type`) to determine behavior:

- Only items with `Source: github` can have `ThreadId` for resolving threads
- Only `Source: github` items appear in PR summary comment tables
- `Source: local` items are kept internal to the workflow

## Items Table

Each file must contain an `## Items` section with a single table.

### Canonical Columns

These columns must exist in this exact order (values may be empty when not applicable):

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

### Column Semantics

- `ThreadId`
  - Required for GitHub inline comments when available.
  - Used by the workflow to resolve threads.
  - Must be preserved by any tool that updates the file.
- `CommentId`
  - Optional identifier if available from GitHub APIs.
- `Severity`
  - For `pr_comments`, set to `major` by default unless the reviewer clearly indicates severity.
- `Title`
  - For `pr_comments`, derive a short title from the comment.
- `Location`
  - Use `L<start>` or `L<start>-L<end>` when possible.

### Wontfix

When `Status` is `wontfix`, `Notes` must include the reason.

### Empty State

If there are no actionable items, still write the file with:

- A valid header
- `## Items` section
- Table header row + separator row only (no item rows)
