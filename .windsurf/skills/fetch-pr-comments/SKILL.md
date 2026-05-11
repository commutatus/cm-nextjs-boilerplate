---
name: fetch-pr-comments
description: Fetch PR review comments once and save them to a local markdown file for later fixing
---

## Goal

Fetch PR feedback from GitHub (inline review threads and general PR comments) and write it to a single local markdown file for downstream processing.

This skill must not apply fixes. It must only fetch/normalize and overwrite the output file.

## Step 1: Preconditions

The caller must provide the PR number. If no PR number is available, stop.

## Step 2: Fetch Comments (once)

Use the GitHub MCP server to fetch PR comments:

- `mcp0_pull_request_read` with method `get_comments` for general PR comments
- `mcp0_pull_request_read` with method `get_review_comments` for inline code review comments

Normalize the results into a list of actionable items:

- Inline: unresolved threads only, capture `threadId`, `path`, `line` (or range), `author`, `body`, and `is_resolved`/`is_outdated`
- General: actionable comments only (skip notifications)

If a single comment contains multiple actionable points, split it into separate items.

## Step 3: Save Comments File (append)

Append to the file (create if it does not exist):

- `.windsurf/outputs/review-and-fix/review-comments.md`

Follow the canonical schema in:

`docs/workflows/review-comments.schema.md`

- If the file does not exist, create it with the header and an empty Items table
- If the file exists, read it first, then append new items to the existing Items table
- Preserve existing items (do not duplicate items with the same `ThreadId` or `CommentId`)

Use an AI-friendly format for new items:

```markdown
| #   | Status | Source | Kind   | Severity | File            | Location | Title         | Body              | Author   | ThreadId   | CommentId | Notes |
| --- | ------ | ------ | ------ | -------- | --------------- | -------- | ------------- | ----------------- | -------- | ---------- | --------- | ----- |
| 1   | open   | github | inline | major    | path/to/file.ts | L10      | <short title> | <actionable body> | <author> | <threadId> |           |       |
```

If there are no actionable comments, do not modify the file (or create it empty if it doesn't exist).
