# Code Review Guidelines

## Code Review Focus Areas

When reviewing code, focus on these categories:

### 1. Logic & Correctness
- Logic errors and incorrect behavior
- Edge cases that aren't handled
- Null/undefined reference issues

### 2. Concurrency & State
- Race conditions or concurrency issues
- Improper resource management or resource leaks

### 3. Security
- Input validation vulnerabilities
- Authentication/authorization issues
- Data exposure risks

### 4. Caching
- Cache staleness issues
- Cache key-related bugs
- Incorrect cache invalidation
- Ineffective caching

### 5. Code Quality
- Violations of existing code patterns or conventions
- Readability and maintainability concerns

## Review Process

1. **Get the diff**: `git diff main...HEAD`
2. **Review each file** against the focus areas above
3. **Report only high-confidence issues** - avoid speculation
4. **Check for pre-existing bugs** in touched code

## Severity Levels

- 🔴 **Critical**: Security vulnerabilities, data loss, crashes
- 🟠 **Major**: Logic errors, incorrect behavior
- 🟡 **Minor**: Code style, minor improvements

## Handling AI Reviewer Comments

When a comment is from an AI reviewer (e.g. GitHub Copilot, automated review bots):

1. Analyze the specific code block in full context — AI reviewers may lack project-wide awareness
2. Investigate dependencies, associated function calls, or usage patterns to understand the code's requirements and purpose
3. Review respective test files (if available) to validate the AI's feedback against expected behavior
4. Propose a final change only after establishing full context of the implementation

## General Guidelines

1. Call multiple tools in parallel for efficiency when exploring the codebase
2. Report pre-existing bugs in touched code to maintain code quality
3. Only report high-confidence issues - avoid speculation
4. If reviewing a specific git commit, local code state may differ from the commit
