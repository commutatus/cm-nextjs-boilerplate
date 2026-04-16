---
name: create-pull-request
description: Create a pull request with a well-structured title and description following the company PR template
---

## PR Title

Generate the title using conventional commit format:

`type(scope): concise description`

- Derive the type from the nature of changes (feat, fix, refactor, docs, chore, etc.)
- Derive the scope from the primary area of code affected
- Keep it concise and descriptive

## PR Description Template

Use the following company PR template. Remove any sections that are not relevant.

```markdown
## What does this change do?

<!-- Summarize the net change in clear prose -->

## Why is this change needed?

<!-- Explain the engineering goal and business objective -->

## How were the changes done?

<!-- Highlight significant design decisions -->

## How was testing done?

<!-- Describe test approach and results -->

## Screenshots/Recording (optional)

<!-- Before/after screenshots or flow recordings -->

## AI Code Review Summary

<!-- Auto-generated from pre-push code review -->

## Anything Else?

<!-- Architecture changes, technical debt, challenges, optimizations -->
```

## How to Populate the Description

1. **What does this change do?** — Summarize from the commit messages and diff
2. **Why is this change needed?** — Infer from branch name, commits, and any review output. If unclear, ask the user
3. **How were the changes done?** — Highlight key design decisions from the diff (e.g. new patterns, libraries, architectural choices)
4. **How was testing done?** — Check for test files in the diff. If none, note that and ask the user
5. **Screenshots/Recording** — Skip unless the user provides them
6. **AI Code Review Summary** — If `.windsurf/workflows/outputs/review-comments.md` exists, include relevant items + summary from it. If no review comments exist, remove this section
7. **Anything Else?** — Note any technical debt, trade-offs, or follow-up work identified during review

## PR Creation (MCP)

1. Always write the PR body to a temp file at `.windsurf/workflows/outputs/pr-body.md` first
2. Use `mcp0_create_pull_request` with:
   - `head`: current branch
   - `base`: base branch (e.g. `main`)
3. Use the generated PR title and the contents of `.windsurf/workflows/outputs/pr-body.md` as the PR title/body

## Guidelines

- Remove empty sections from the final PR description
- Keep descriptions factual — don't speculate about intent if unclear, ask the user
- Reference issue/ticket numbers if available (e.g. from branch name like `feature/TICKET-123-description`)
- Use bullet points for lists of changes rather than long paragraphs
