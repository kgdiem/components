# Agent Behavior

## Test Driven Development

**ALWAYS** practice test driven development:

- Write tests, then change the code
- When writing tests, test the intent and not the implementation
- If tests don't exist:
  1. Write tests for current behavior → verify they pass
  2. Update tests for desired behavior → verify they fail
  3. Modify code → verify tests pass
- DO NOT expect tests to always be correct
  - When a test fails, reason about if the code is correct or if the test is correct

## Code Modification

**NEVER** use scripts to generate or modify source code:

- Do NOT write or execute scripts (Python, shell, perl, etc.) to generate or modify source code files
- Do NOT use code generation tools or templating scripts for source code
- Always use direct file editing tools to modify code
- Make changes directly to source files, not through intermediate scripts
- Note: This rule applies to source code generation/modification, not build scripts, migrations, or data transformation scripts

## Code Pattern Verification

**ALWAYS** search codebase for similar patterns before creating new ones:

- Search for existing implementations of similar functionality
- Check if requested changes align with existing architecture
- Read relevant files to understand current implementation patterns
- Check for related code that might be affected
- If no similar pattern exists, document why a new approach is needed
- Avoid deprecated patterns; check for newer alternatives

## Conversational Behavior

**DO NOT** be overly agreeable or assume the user is always correct:

- When the user questions a solution or is brainstorming, engage critically
- Avoid phrases like "You are absolutely right!" or "That's a great idea!" without analysis
- Provide honest technical assessment while remaining respectful and constructive
- If the user's approach has issues, explain the problems constructively and suggest alternatives
- When brainstorming, contribute technical insights rather than just agreeing

## Clarifying Questions

**ALWAYS** ask clarifying questions when:

- Requirements are ambiguous or incomplete
- Multiple valid implementation approaches exist
- Breaking changes might be needed (ask for confirmation)
- User requests contradict existing patterns (verify intent)
- Edge cases or error handling aren't specified
- Performance or scale requirements are unclear

**DO NOT** ask questions for:

- Standard patterns that are well-established in the codebase
- Obvious typos or simple corrections
- When the intent is clear from context

**When uncertain**, address all uncertainties rather than making assumptions. When multiple uncertainties exist, prioritize the most critical questions that block progress, but ensure all uncertainties are eventually confirmed or resolved

## Error Checking

**ALWAYS** check for and fix type errors:

- Use eslint to view type errors
- Fix ALL type errors before completing a task
- Do not proceed with implementation if type errors exist
- Ensure all imports resolve correctly

## Error Handling

**ALWAYS** handle errors and edge cases appropriately:

- Consider error scenarios when implementing features
- Follow existing error handling patterns in the codebase
- When error handling is unclear, ask for clarification on expected behavior
- Document edge cases that might need special handling

## Documentation

**ALWAYS** update documentation when making code changes:

- Update relevant documentation files when modifying functionality
- Keep inline comments and docstrings up to date
- Update README files if behavior or setup changes
- Note breaking changes in documentation

# Coding Guidelines

## Component Naming

**ALWAYS** name components in PascalCase:

- Use PascalCase for component names
- Use descriptive names that describe the component's purpose
- Avoid abbreviations or acronyms unless they are well-known
- Use the component's primary purpose as the name
- If the component has multiple parts, use a hyphen to separate them
- If the component is a container, use the word "Container" as a suffix

## Storybook

**ALWAYS** update stories when making code changes:

- Update relevant stories when modifying functionality
- Keep stories up to date with the latest code
- Update stories if behavior or setup changes
- Note breaking changes in stories

**ALWAYS** create stories for new components
