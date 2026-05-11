---
description: Review unpushed changes, manage PRs, and address review comments
---

# Review and Fix Workflow

This workflow reviews unpushed code changes, creates or updates PRs, and addresses reviewer feedback — all in one flow.

## Prerequisites

All of the following **must** succeed. If **any** check fails, inform the user of the specific failure and **stop the workflow immediately** — do not proceed to any subsequent steps.

1. **GitHub MCP Server** — Check that the server is configured and connected by listing available tools
2. **GitHub CLI (`gh`)** — Verify it is installed and authenticated:

```bash
gh auth status
```

3. **Clean working tree** — Abort the workflow if there are any uncommitted changes:

```bash
git status --porcelain
```

If any output is returned, tell the user to commit or stash local changes and stop the workflow.

---

## Step 1: Confirm Branch

Ensure the workflow output directory exists:

This workflow stores its generated artifacts under `.windsurf/outputs/review-and-fix/`

```bash
mkdir -p .windsurf/outputs/review-and-fix
```

// turbo

```bash
git branch --show-current
```

Record this as the starting branch (the branch to restore back to at the end of the workflow).

Create a workflow metadata file (if it does not already exist):

`docs/workflows/review-and-fix.metadata.json`

Use it to store defaults that should not be asked every run:

- `defaultBaseBranch`
- `defaultReviewers`

If `defaultBaseBranch` is empty, prompt the user for the base branch (e.g. `main`) and update `docs/workflows/review-and-fix.metadata.json` so the next run does not need to ask again.

Ask the user to confirm this is the branch they want to review using `ask_user_question` with options:

- **Yes**: Continue with this branch
- **No**: Let the user specify the correct branch

If the user selects **No**, ask them for the branch name and switch to it:

```bash
git checkout <branch_name>
```

---

## Step 2: Check for Open PR

Check if the current branch has an open PR using:

- Determine the repo owner automatically:

```bash
gh repo view --json owner -q .owner.login
```

- `mcp0_list_pull_requests` with `head` set to `<owner>:<branch_name>`

If a PR exists, create/overwrite `.windsurf/outputs/review-and-fix/pr-context.json` with:

- `prNumber`
- `prSource`: `github`

Then proceed to Step 3.

If no PR exists, proceed to Step 4.

---

## Step 3: Fetch PR Comments

If `.windsurf/outputs/review-and-fix/pr-context.json` exists, read `prNumber` from it and invoke the `fetch-pr-comments` skill.

This skill must fetch PR comments only once and append them to `.windsurf/outputs/review-and-fix/review-comments.md` (create the file if it does not exist).

If `.windsurf/outputs/review-and-fix/pr-context.json` does not exist, skip this step.

---

## Step 4: Run Local PR Review (AI)

Invoke the `ai-code-review` skill.

This skill's sole purpose is to run a local PR-style code review and append findings to `.windsurf/outputs/review-and-fix/review-comments.md` (create the file if it does not exist). If the file already exists, avoid duplicating any comments that are already present.

---

## Step 5: Address Review Comments (AI)

Invoke the `ai-comments-fix` skill.

This skill must iterate over `.windsurf/outputs/review-and-fix/review-comments.md` and guide the user through Fix/Wontfix decisions, applying fixes and updating the file until there are no remaining open items.

---

## Step 6: Review Loop

Check `.windsurf/outputs/review-and-fix/review-comments.md`.

If there are no remaining items with status `open` (i.e. all items are marked `fixed` or `wontfix`), stop the loop and proceed to Step 7.

Otherwise, return to Step 4 to continue the review loop.

---

## Step 7: Commit Changes

After the review loop is done, commit the changes:

Note: this repo runs `npm run test-all` in the Husky pre-commit hook. Do not duplicate these checks here.

```bash
git add <modified_files>
```

Do not stage or commit any workflow output files:

- `.windsurf/outputs/review-and-fix/review-comments.md`
- `.windsurf/outputs/review-and-fix/pr-body.md`
- `.windsurf/outputs/review-and-fix/pr-context.json`

Before committing, verify the staged files do not include these paths:

```bash
git diff --cached --name-only
```

```bash
git commit -m "<conventional_commit_message>"
```

If the commit command fails, the workflow must abort. This commonly indicates the Husky pre-commit hook failed (e.g. `npm run test-all`).

Follow the commit message rules for formatting and bullet point details.

---

## Step 8: Push Changes/Update PR

Push the branch:

```bash
git push
```

If `git push` fails:

- Ask the user whether a force push is allowed
- If the user says **no**, abort the workflow
- If the user says **yes**, retry with:

```bash
git push --force-with-lease
```

---

## Step 9: Create PR

If `.windsurf/outputs/review-and-fix/pr-context.json` exists, move to step 10. Otherwise, create a PR:

Create the PR using the `create-pull-request` skill:

Record the PR number for the remaining steps.

Create/overwrite `.windsurf/outputs/review-and-fix/pr-context.json` with:

- `prNumber`
- `prSource`: `workflow`

---

## Step 10: Mark Resolved Comments on GitHub

If `prSource` in `.windsurf/outputs/review-and-fix/pr-context.json` is `workflow`, skip this step.

### Inline Review Comments

If `.windsurf/outputs/review-and-fix/review-comments.md` does not exist or has no items with `Source: github`, skip this step.

Use the `ThreadId` column from items with `Source: github` (per `docs/workflows/review-comments.schema.md`) when resolving threads.

For each resolved comment (not ignored), resolve the thread:

```bash
gh api graphql -f query='
mutation {
  resolveReviewThread(input: {threadId: "<THREAD_ID>"}) {
    thread { isResolved }
  }
}'
```

Multiple threads can be resolved in a single mutation by using aliases (t1, t2, etc.).

---

## Step 11: Post Summary Comment

Post a run marker + summary comment on the PR using `mcp0_add_issue_comment`.

First, get the latest commit SHA:

```bash
git rev-parse HEAD
```

Include a clear marker at the top so reviewers know the workflow was run:

- Workflow: `review-and-fix`
- Timestamp: <timestamp>
- Commit: `<sha>`

Then include a markdown body containing:

If `.windsurf/outputs/review-and-fix/review-comments.md` exists and has items with `Source: github`, include:

- **Inline Review Comments** — table with items where `Source: github` and `Kind: inline`, showing reviewer, file, comment, and status (✅ Fixed / 🚫 Wontfix)
- **General PR Comments** — table with items where `Source: github` and `Kind: general`, showing reviewer, comment, and status

Do not include any items with `Source: local` in the GitHub comment.

Always include:

- **Changes** — bullet list of changes made

---

## Step 12: Request Human Review

Request review using the GitHub MCP server:

- Load `defaultReviewers` from `docs/workflows/review-and-fix.metadata.json`
- Read the PR number from `.windsurf/outputs/review-and-fix/pr-context.json`
- Use `mcp0_pull_request_read` to get PR details and determine the PR author
- If the PR author is in `defaultReviewers`, remove them from the reviewers list
- Use `mcp0_update_pull_request` with the PR number and `reviewers` set to the filtered `defaultReviewers`

---

## Step 13: Cleanup

Delete any review output files generated during this workflow:

```bash
rm -f .windsurf/outputs/review-and-fix/
```

---

## Summary

Present final status to the user:

| Task                   | Status                  |
| ---------------------- | ----------------------- |
| Review loop            | ✅ Done                 |
| Commit changes         | ✅ Committed            |
| Create/update PR       | ✅ Done                 |
| Mark comments resolved | ✅ X resolved           |
| Post run marker        | ✅ Posted               |
| Request human review   | ✅ Reviewers requested  |
| Cleanup                | ✅ Output files deleted |
