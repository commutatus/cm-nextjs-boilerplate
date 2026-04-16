---
name: ai-code-review
description: Review code changes for bugs and issues, present findings interactively, and save a review output summary
---

## Goal

Perform a local, GitHub-style PR code review and write the resulting review comments to a single local markdown file for downstream processing.

This skill must not apply fixes. It must only generate review findings and overwrite the output file.

## Step 1: Compute GitHub-Style PR Diff (Local)

Ask the user for the base branch to compare against (default: `main`).

GitHub PRs use a three-dot diff (merge-base comparison). Use that comparison locally.

// turbo

```bash
git fetch origin
```

```bash
git diff --name-status origin/<base_branch>...HEAD
```

```bash
git diff --unified=3 origin/<base_branch>...HEAD
```

## Step 2: Review Changes

Follow the code review rubric from:

`/.windsurf/skills/ai-code-review/code-review-guidelines.md`

Identify high-confidence issues only.

## Step 3: Save Review Comments File (append with deduplication)

Append to the file (create if it does not exist):

`.windsurf/workflows/outputs/review-comments.md`

Follow the canonical schema in:

`docs/workflows/review-comments.schema.md`

- If the file does not exist, create it with the header and Items table
- If the file exists, read it first, then append only new findings
- **Avoid duplicates**: Do not add an item if a similar finding (same file + similar title/body) already exists in the file

Use a format optimized for AI processing:

```markdown
| #   | Status | Source | Kind    | Severity | File            | Location | Title         | Body                     | Author | ThreadId | CommentId | Notes |
| --- | ------ | ------ | ------- | -------- | --------------- | -------- | ------------- | ------------------------ | ------ | -------- | --------- | ----- |
| 1   | open   | local  | general | major    | path/to/file.ts | L10-L25  | <short title> | <actionable description> |        |          |           |       |
```

If there are no issues and the file does not exist, create it with an empty Items table. If the file exists, do not modify it.
